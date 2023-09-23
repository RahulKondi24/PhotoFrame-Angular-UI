import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit{
  productlist: any;
  baseURL = "https://localhost:44396/api/Product/";
  constructor(private http: HttpClient, private activeroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.http.get(this.baseURL + "FetchProducts").subscribe(
      (res: any) => {
        this.productlist = res;
      })
  }
  
  // AddProducttoCart(){
  //   this.http.post(this.baseURL + "AddProducttoCart",).subscribe(
  //     (res: any) => {
  //       this.productlist = res;
  //     })
  // }

}
