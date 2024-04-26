import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  setItemJson(key: string, value: any): void{
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    console.log('key desde getItem: '+key);
    return sessionStorage.getItem(key);
  }

}
