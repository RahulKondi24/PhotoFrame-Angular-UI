import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthuserService } from 'src/app/services/authuser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  constructor(private route: Router, private http: AuthuserService, private fb: FormBuilder, private toaster: ToastrService) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }
  cancel() {
    this.toaster.info("Your now Home Page", 'Info', { positionClass: 'toast-bottom-right' });
    this.route.navigate(["/"]);
  }
  login(): void {
    if (this.loginForm.valid) {
      this.http.login(this.loginForm.value).subscribe(
        (res: any) => {
          if (res.Role == "seller") {
            localStorage.setItem('token', res.Token)
            localStorage.setItem('username', res.Username);
            localStorage.setItem('role', res.Role);
            this.toaster.success(res.Message, 'Sucess', { positionClass: 'toast-bottom-right' });
            this.route.navigate(["/sellerdashboard"]);
          } else if (res.Role == "admin") {
            localStorage.setItem('token', res.Token)
            localStorage.setItem('username', res.Username);
            localStorage.setItem('role', res.Role);
            this.toaster.success(res.Message, 'Sucess', { positionClass: 'toast-bottom-right' });
            this.route.navigate(["/admin"]);
          }
          else {
            localStorage.setItem('token', res.Token)
            localStorage.setItem('username', res.Username);
            localStorage.setItem('role', res.Role);
            this.toaster.success(res.Message, 'Sucess', { positionClass: 'toast-bottom-right' });
            this.route.navigate(["/home"]);
          }
        })
    } else {
      this.toaster.error("please enter all fills", 'Error', { positionClass: 'toast-bottom-right' });

    }
  }
}
