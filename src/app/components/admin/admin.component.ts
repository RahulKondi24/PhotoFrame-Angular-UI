import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  baseURL = "https://localhost:44396/User/Users"
  users: any;
  constructor(private http: HttpClient) {
    this.http.get(this.baseURL).subscribe(
      data => {
        this.users = data;
        setTimeout(() => {
          $('#datatable').DataTable({
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            lengthMenu: [2, 5, 10]
          });
        }, 1);
      }, error => console.error(error));
  }
  Role:any[]=[];
  ngOnInit(): void {
    this.http.get("https://localhost:44396/User/Roles").subscribe(
      (res: any)=>{
        this.Role=res;
        console.log(this.Role);
        
      })
  }
  surgeonList: any
  DownloadPdf() {
    this.http.get("https://localhost:44396/api/UserPdfCreator/CreateAndDownload", { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const blobUrl = URL.createObjectURL(response);
        console.log(blobUrl);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'Users.pdf';
        link.click();
        URL.revokeObjectURL(blobUrl);
      });
  }
}
