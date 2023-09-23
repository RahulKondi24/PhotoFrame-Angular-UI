import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {
  baseURL="https://localhost:44396/";
  constructor(private http:HttpClient) { }
  signup(user:any):any{
   return this.http.post(this.baseURL+"User/register",user)
  }
  login(user:any):any{
    return this.http.post(this.baseURL+"User/login",user)
  }
}
