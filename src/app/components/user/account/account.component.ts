import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  u: User = new User();
  uu: User = new User();
  Fullname!: string;
  constructor(private route: Router, private http: HttpClient, private toaster: ToastrService) { }
  ngOnInit(): void {
    var username = String(localStorage.getItem('username'));
    this.http.get("https://localhost:44396/User/Users/" + username).subscribe(
      (res: any) => {
        this.u = res;
        this.u.Id = res.UserId;
        this.uu = res;
        this.Fullname = res.Fullname;
        console.log(res)
      });
  }
  isfullname: boolean = false;
  isusername: boolean = false;
  isemail: boolean = false;
  ismobilenumber: boolean = false;
  isedit(id: any) {
    if (id === 1) {
      this.isfullname = true;
      this.isusername = true;
      console.log(this.u)
    } else if (id === 2) {
      this.isemail = true;
      console.log(this.u)
    }
    else if (id === 3) {
      this.ismobilenumber = true;
      console.log(this.u)
    }
  }
  save(id:any) {
    console.log(this.u.Id)
    if (this.u != null) {
      this.http.put("https://localhost:44396/User/UpdateUser", this.u).subscribe(
        (res: any) => {
          if (id === 1) {
            this.isfullname = false;
            this.isusername = false;
            window.location.reload();
            console.log(this.u)
          } else if (id === 2) {
            this.isemail = false;
            window.location.reload();
            console.log(this.u)
          }
          else if (id === 3) {
            this.ismobilenumber = false;
            window.location.reload();
            console.log(this.u)
          }
          this.toaster.success(res.Message, 'Sucess', { positionClass: 'toast-bottom-right' });
        })
    }
    else {
      alert("sonthing went wrong");
    }
  }
  cancel(id: any) {
    if (id === 1) {
      this.isfullname = false;
      this.isusername = false;
      console.log(this.u)
    } else if (id === 2) {
      this.isemail = false;
      console.log(this.u)
    }
    else if (id === 3) {
      this.ismobilenumber = false;
      console.log(this.u)
    }
  }
}
