import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { __values } from 'tslib';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  productForm!: FormGroup
  search = "";

  constructor(private http: HttpClient, private fb: FormBuilder, private toaster: ToastrService, private route: Router,private activeroute:ActivatedRoute) { }
  ngOnInit(): void {
    this.GetProducts();
    this.productForm = this.fb.group({
      productimage: new FormControl("", Validators.required),
      productname: new FormControl("", Validators.required),
      productdescription: new FormControl("", Validators.required),
      productprice: new FormControl("", Validators.required)
    })
   
  }
  list: any[]=[];
  baseURL = "https://localhost:44396/api/Product/"
  p: Product = new Product();
  GetProducts(): any {
    this.http.get(this.baseURL + "FetchProducts").subscribe(
      (res: any) => {
        this.list = res;
      }
    )
  }
  onselectFile(e:any){
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
         this.p.Productimage=event.target.result;
      }
    }
  }
  add(): void {
    // console.log(this.productForm.valid);
    // console.log(this.productForm.value);
    this.p.Id=0;
    //  console.log(this.p)
    if (this.productForm.valid) {
      this.http.post(this.baseURL + "AddProduct", this.p).subscribe(
        (res: any) => {
          this.toaster.success(res.Message, 'Sucess', { positionClass: 'toast-bottom-right' });
          this.route.navigate(["/productlist"])
          this.productForm.reset();
        })
    }
    else {
      this.toaster.error("fill the form", 'Error', { positionClass: 'toast-bottom-right' });
    }
  }
  assvaluesedit(data: any): void {
    this.p.Id = data.Id
    this.p.Productname = data.Productname
    this.p.Productdescription = data.Productdescription
    this.p.Productimage = data.Productimage
    this.p.Productprice = data.Productprice
    console.log(this.p);
  }
  edit(){
    this.http.put(this.baseURL + "EditProduct",this.p).subscribe(
      (res: any) => {
        this.toaster.success(res.Message, 'Sucess', { positionClass: 'toast-bottom-right' });
        this.productForm.reset();
        location.reload();          
        this.route.navigate(["/product"])
      })
  }
  removeproduct(ID: number): void {
    this.http.delete(this.baseURL + "RemoveProductById/" + ID).subscribe(
      (res: any) => {
        this.toaster.success(res.Message, 'Sucess', { positionClass: 'toast-bottom-right' });
        this.productForm.reset();
      })
  }
  cancel(){
    this.productForm.reset();
  }
  
}
