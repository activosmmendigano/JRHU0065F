import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Report, Loading, Confirm } from 'notiflix';

@Injectable({
  providedIn: 'root'
})
export class NotiflixService {

  private notiflixInstance: typeof Notiflix = Notiflix;

  constructor() { }

  configBlockInit: Notiflix.IBlockOptions = {};
  configConfirmInit: Notiflix.IConfirmOptions = {};
  configLoadingInit: Notiflix.ILoadingOptions = {};
  configNotifyInit: Notiflix.INotifyOptions = {};
  configReportInit: Notiflix.IReportOptions = {};

  public get notiflix(): typeof Notiflix {
    return this.notiflixInstance;
  }

  initializeNotiflix(): void {
    this.notiflix.Block.init(this.configBlockInit);
    this.notiflix.Confirm.init(this.configConfirmInit);
    this.notiflix.Loading.init(this.configLoadingInit);
    this.notiflix.Notify.init(this.configNotifyInit);
    this.notiflix.Report.init(this.configReportInit);
  }

  setBlockConfig(configBlockInit: Notiflix.IBlockOptions): void {
    this.configBlockInit = configBlockInit;
    this.initializeNotiflix();
  }

  setConfirmConfig(configConfirmInit: Notiflix.IConfirmOptions): void {
    this.configConfirmInit = configConfirmInit;
    this.initializeNotiflix();
  }

  setLoadingConfig(configLoadingInit: Notiflix.ILoadingOptions): void {
    this.configLoadingInit = configLoadingInit;
    this.initializeNotiflix();
  }

  setNotifyConfig(configNotifyInit: Notiflix.INotifyOptions): void {
    this.configNotifyInit = configNotifyInit;
    this.initializeNotiflix();
  }

  setReportConfig(configReportInit: Notiflix.IReportOptions): void {
    this.configReportInit = configReportInit;
    this.initializeNotiflix();
  }

  alerta(titulo: string, mensaje: string, boton: string): void {
    Report.warning(
      titulo,
      mensaje,
      boton,
    );
  }

  success(titulo: string, mensaje: string, boton: string): void {
    Report.success(
      titulo,
      mensaje,
      boton,
    );
  }

  error(titulo: string, mensaje: string, boton: string): void {
    Report.failure(
      titulo,
      mensaje,
      boton,
    );
  }

  info(titulo: string, mensaje: string, boton: string): void {
    Report.info(
      titulo,
      mensaje,
      boton,
    );
  }

  loadingStart(message: string) {
    Loading.hourglass(message);
  }

  loadingClose(time: number) {
    Loading.remove(time);
  }

}
