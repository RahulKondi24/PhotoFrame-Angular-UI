import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  search!:string;
  productlist: any;
  baseURL = "https://localhost:44396/api/Product/";
  constructor(private http: HttpClient, private activeroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.search = String(this.activeroute.snapshot.paramMap.get('name'));
    this.http.get(this.baseURL + "FetchProducts").subscribe(
      (res: any) => {
        this.productlist = res;
      })
    console.log(this.search)
  }
}
