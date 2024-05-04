import { NotiflixService } from '../../shared/services/notiflix.service';
import { UploadService } from '../../service/upload.service';
import { Iupload } from '../../models/iupload';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { IUsuarioSesion } from 'src/app/models/iusuario-sesion';
import { ItemSession } from 'src/app/shared/constants/item-session';
import { ViewService } from 'src/app/service/view.service';
import { ITest } from 'src/app/models/itest';
import { IDatabaseResponse } from 'src/app/models/idatabase-response';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Proceso } from 'src/app/models/proceso';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @ViewChild('fileInput', { static: false })
  fileInputRef!: ElementRef<HTMLInputElement>;
  userDataFromSession!: IUsuarioSesion;
  selectedTest: string | undefined; // Definir la propiedad selectedTest
  j: number = 0;
  constructor(
    private service: ViewService,
    private uploadService: UploadService,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private _notiflixService: NotiflixService
  ) {
    this.userDataFromSession = this.sessionStorageService.getItemJson(
      ItemSession.USER_DATA
    );
    this.getViews();
  }

  datatable!: Iupload[];
  upload!: Iupload;
  loading: boolean = true;
  visualizaDetalle: boolean = false;
  testsRequired!: ITest[];
  valuePDF: string | undefined;
  selectedFileNames: (string | null)[] = [];
  responseFileUploaded: IDatabaseResponse[] = [];
  attachedView: string = 'TRUE';
  uploadView: string = 'TRUE';
  userProfile!: Proceso;

  ngOnInit() {
    this.setDefault();

    this._notiflixService.loadingStart('Cargando datos...');
    setTimeout(() => {
      this.loading = false;
      this._notiflixService.loadingClose(1000);
    }, 2000);
  }
  async getViews(): Promise<void> {
    try {
      const userProfileOrNull = await this.authService.getFuntionByRole();
      if (userProfileOrNull !== null) {
        this.userProfile = userProfileOrNull;
        this.attachedView = this.userProfile.rolAnexo;
        this.uploadView = this.userProfile.rolCargar;
        console.log('this.attachedView : ' + this.attachedView);
        console.log('this.uploadView : ' + this.uploadView);
      } else {
        // Si getFuntionByRole() devuelve null, manejar la situación aquí
        console.error('El perfil de usuario es null');
      }
    } catch (error) {
      console.error('Error obteniendo el perfil de usuario:', error);
    } finally {
      this._notiflixService.loadingClose(1000);
    }
  }
  async getTypesTests() {
    try {
      const testsReq = await this.service.getTestRequired();
      if (testsReq !== null) {
        this.testsRequired = testsReq;
      } else {
        console.error('El servicio devolvió datos nulos');
      }
    } catch (error) {
      console.error('Error al obtener los tests:', error);
    } finally {
      this._notiflixService.loadingClose(1000);
    }
  }

  uploadAttachedTest(file: File) {
    this._notiflixService.loadingStart('Cargando datos...');
  
    this.getBase64(file).then((base64: string | null) => {
      if (base64 !== null) {
        const uploadDataAttached: Iupload = {
          libConsecutivo: this.userDataFromSession.libConsecutivo,
          usuario: this.userDataFromSession.usuUsuario,
          prdCodigo: 120,
          tdcTdEpl: this.userDataFromSession.tdcTdEpl,
          eplNd: this.userDataFromSession.eplNd.toString(),
          prdProducto: '000000 - 120',
          base64: base64,
        };
        this.uploadService.create(uploadDataAttached).subscribe(
          (response: IDatabaseResponse | null) => {
            if (response !== null) {
              this.responseFileUploaded = [response];
              this._notiflixService.success(
                'Url descarga de archivo',
                response.message,
                'Continuar'
              );
            } else {
              console.error('El servicio devolvió datos nulos');
            }
          },
          (error) => {
            console.error('Error al obtener los tests:', error);
          }
        ).add(() => {
          this._notiflixService.loadingClose(1000);
        });
      } else {
        console.error('No se pudo obtener la cadena Base64 del archivo.');
        this._notiflixService.loadingClose(1000);
      }
    }).catch((error) => {
      console.error('Error al obtener la cadena Base64 del archivo:', error);
      this._notiflixService.loadingClose(1000);
    });
  }
  
  onFileUpload(event: any) {
    // Aquí puedes acceder al archivo cargado
    const uploadedFiles = event.files;
    console.log('Archivos cargados:', uploadedFiles);
     this.uploadAttachedTest(uploadedFiles[0]);
  }

  uploadTests(uploadData: Iupload) {
    this._notiflixService.loadingStart('Cargando datos...');
    if (uploadData) {
      this.uploadService.create(uploadData).subscribe(
        (response: IDatabaseResponse | null) => {
          if (response !== null) {
            this.responseFileUploaded = [response];

            this._notiflixService.success(
              'Url descarga de archivo',
              response.message,
              'Continuar'
            );
            this._notiflixService.loadingClose(1000);
          } else {
            console.error('El servicio devolvió datos nulos');
            this._notiflixService.loadingClose(1000);
          }
        },
        (error) => {
          console.error('Error al obtener los tests:', error);
          this._notiflixService.loadingClose(1000);
        }
      );
    }
  }
  handlePDFSelection(event: any) {
    this._notiflixService.loadingStart('Cargando datos...');

    this.valuePDF = event.value;
    if (this.valuePDF === 'several') {
      this.getTypesTests();
    } else {
      this.testsRequired = [];
      const newTest: ITest = {
        prdDescripcion: 'EXAMEN MEDICO GENERAL',
        prdProducto: '720784-000',
        coincidente: true,
      };

      // Agregar el objeto ITest al arreglo testsRequired
      this.testsRequired.push(newTest);
    }
    if (this.testsRequired.length > 0) {
      this._notiflixService.loadingClose(1000);
    }
  }

  handleFileInput(event: any, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (this.isValidFileSize(file) && this.isValidFileExtension(file)) {
        this.selectedFileNames[index] = file.name;
        this.buildUploadData(index, file);
      } else {
        this._notiflixService.error(
          'Error',
          'El archivo seleccionado debe ser un archivo PDF y no debe superar las 5Mb de tamaño',
          'Aceptar'
        );
        this.selectedFileNames[index] = null;
      }
    } else {
      this._notiflixService.error(
        'Error',
        'No se ha podido obtener el archivo seleccionado ',
        'Aceptar'
      );
      this.selectedFileNames[index] = null;
    }
  }

  isValidFileSize(file: File): boolean {
    return file.size <= 5 * 1024 * 1024;
  }

  isValidFileExtension(file: File): boolean {
    this.userDataFromSession.tdcTdEpl;
    return file.name.toLowerCase().endsWith('.pdf');
  }

  getBase64(file: File): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64String = reader.result;
          const base64Data = base64String.split(',')[1] ?? '';
          resolve(base64Data);
        } else {
          resolve(null);
        }
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(file);
    });
  }
  async buildUploadData(index: number, file: File): Promise<Iupload | null> {
    try {
      const base64 = await this.getBase64(file);
      if (
        this.userDataFromSession &&
        this.testsRequired[index] &&
        this.userDataFromSession.libConsecutivo &&
        this.userDataFromSession.usuUsuario &&
        this.userDataFromSession.tdcTdEpl &&
        this.userDataFromSession.eplNd
      ) {
        const uploadData: Iupload = {
          libConsecutivo: this.userDataFromSession.libConsecutivo,
          usuario: this.userDataFromSession.usuUsuario,
          prdCodigo: 68,
          tdcTdEpl: this.userDataFromSession.tdcTdEpl,
          eplNd: this.userDataFromSession.eplNd.toString(),
          prdProducto: this.testsRequired[index].prdProducto,
          base64: base64 ?? '',
        };
        this.uploadTests(uploadData);
        return uploadData;
      } else {
        console.error(
          'No se pudieron obtener todos los datos necesarios para construir el objeto uploadData.'
        );
        return null;
      }
    } catch (error) {
      console.error('Error al construir uploadData:', error);
      return null;
    }
  }
  setDefault() {
    this.datatable = [];
    this.testsRequired = [];
    this.valuePDF = '';
    this.selectedFileNames = [];
    this.responseFileUploaded = [];
  }
}
