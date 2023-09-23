import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  list: any;
  baseURL = "https://localhost:44396/api/Product/"
constructor(private http:HttpClient) {}
  ngOnInit(): void {
    this.http.get(this.baseURL + "FetchProducts").subscribe(
      (res: any) => {
        this.list = res;
      })
     }
     
}
