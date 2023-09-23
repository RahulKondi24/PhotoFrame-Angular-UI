import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthuserService } from 'src/app/services/authuser.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  registerForm!:FormGroup
  constructor(private route:Router,private http:AuthuserService,private fb:FormBuilder,private toster:ToastrService) {}
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      id :0,
      fullname : new FormControl("",Validators.required),
      username : new FormControl("",Validators.required),
      email : new FormControl("",[Validators.required,Validators.email]),
      mobilenumber : new FormControl("",Validators.required),
      password : new FormControl("",Validators.required)
    })
  }
  cancel(){
    this.toster.info("Your now Home Page",'Cancel', {positionClass: 'toast-bottom-right'});
    this.route.navigate(["/"]);
  }
  register():void{
    if(this.registerForm.valid){
    this.http.signup(this.registerForm.value).subscribe(
      (res:any)=>{
    this.toster.success(res.Message,'Sucess', {positionClass: 'toast-bottom-right'});
        this.route.navigate(["/log-in"]);
      })
    }else{
      this.toster.error("please enter all fills",'Error', {positionClass: 'toast-bottom-right'});
    }
  }
}
