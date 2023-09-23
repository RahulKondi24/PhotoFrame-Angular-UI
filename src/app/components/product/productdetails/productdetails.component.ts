import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart';
import { CartComponent } from '../../cart/cart.component';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  id!: number;
  product: any;
  quntity: number = 1;
  c: Cart = new Cart();
  baseURL = "https://localhost:44396/api/Product/"
  constructor(private http: HttpClient, private toaster: ToastrService, private activeroute: ActivatedRoute, private route: Router) { }
  ngOnInit(): void {
    this.id = Number(this.activeroute.snapshot.paramMap.get('productid'));
    this.http.get(this.baseURL + "FetchProductById/" + this.id).subscribe(
      (res: any) => {
        this.product = res;
      })
    var username = localStorage.getItem('username');
    this.http.get("https://localhost:44396/User/Users/" + username).subscribe(
      (res: any) => {
        if(res){
          this.c.UserId = res.UserId;
        }else{
      this.toaster.error(res.Message, "Error", { positionClass: 'toast-bottom-right' })
          this.route.navigate(['/log-in']);
        }
      })
      
  }

  plus(): void {
    this.quntity = this.quntity + 1;
  }
  mines(): void {
    if (this.quntity == 0) {
      alert("min no is one")
      this.toaster.error("minuim no is one", "Error", { positionClass: 'toast-bottom-right' })
      this.quntity = 1;
    } else {
      this.quntity = this.quntity - 1;
    }

  }
  Additem(productId: any) {
    this.c.Id = 0;
    this.c.ProductId = productId;
    this.c.Quntity = this.quntity;
    if(this.c.UserId!=null){
      this.http.post("https://localhost:44396/api/Product/AddProducttoCart", this.c).subscribe(
        (res: any) => {
          this.toaster.success(res.Message, "success", { positionClass: 'toast-bottom-right' })
        })
      this.route.navigate(['cart']);
    }else {
      this.toaster.error("Login First", "Error", { positionClass: 'toast-bottom-right' })
      this.route.navigate(['/log-in']);
    }
    
  }
  
}
