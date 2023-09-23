import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private route: Router, private http: HttpClient, private toaster: ToastrService) { }
  noofitems: number = 0;
  username:any
  role:any
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.role = localStorage.getItem('role');
    console.log(this.role)
    this.http.get("https://localhost:44396/api/Product/Cart/" + this.username).subscribe(
      (res: any) => {
        if (res) {
          res.forEach((element: any) => {
            this.noofitems += 1
          })
        } else {
          this.toaster.error(res.Message, "Error", { positionClass: 'toast-bottom-right' })
          this.route.navigate(['/log-in']);
        }

      })
  }
  search!: any
  Get() {
    if (this.search == "") {
      alert("please enter")
      this.route.navigate(['home']);
    }
    else if (this.search == undefined) {
      alert("please enter");
      this.route.navigate(['home']);
    } else {
      this.route.navigate(['search/' + this.search]);
      this.search.reset();
    }
  }
  Islogin() {
    return localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }
  gotocart() {
    this.route.navigate(['cart']);
  }
}