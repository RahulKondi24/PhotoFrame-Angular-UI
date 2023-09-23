import { Injectable } from '@angular/core';
import {  Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private auth:AuthService,private route:Router) {
  }
  canActivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
   if(this.auth.IsLogedin())
   {
    return true;
   } 
   else{
    this.route.navigate(["/log-in"])
    return false;
   }
  }
  
}
