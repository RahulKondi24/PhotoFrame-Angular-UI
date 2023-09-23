import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  IsLogedin(){
    return !!localStorage.getItem('token');
  }
}
