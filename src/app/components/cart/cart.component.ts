import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  charges:number=200;
  noofitems: number = 0;
  totalprice: number = 0;
  UserId!:number;
  productlist: any[] = [];
  constructor(private http: HttpClient, private toaster: ToastrService) { }
  ngOnInit(): void {
    this.get();
    var username = localStorage.getItem('username');
    this.http.get("https://localhost:44396/User/Users/" + username).subscribe(
      (res: any) => {
        this.UserId = res.UserId;
      })  
  }
  get() {
    var data = localStorage.getItem('username');
    this.http.get("https://localhost:44396/api/Product/Cart/" + data).subscribe(
      (res: any) => {
        this.productlist = res;
        console.log(res)
        res.forEach((element: any) => {
          this.totalprice+=element.Quntity*element.PRODUCTPRICE
          this.noofitems+=1
          })
         
      })
  }
  Removeitem(ID: number) {
    this.http.delete("https://localhost:44396/api/Product/RemoveProducttoCart/" + ID).subscribe(
      (res: any) => {
        this.get();
        this.toaster.success(res.Message, 'Sucess', { positionClass: 'toast-bottom-right' });
      })
  }
  RemoveAllitem(ID: number) {
    this.noofitems= 0;
    this.totalprice= 0;
    this.http.delete("https://localhost:44396/api/Product/RemoveProductAlltoCart/" + ID).subscribe(
      (res: any) => {
        this.get();
        this.toaster.success(res.Message, 'Sucess', { positionClass: 'toast-bottom-right' });
      })
  }
}
