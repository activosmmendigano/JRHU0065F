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
    return sessionStorage.getItem(key);
  }
  getItemJson(key: string): any {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

}
