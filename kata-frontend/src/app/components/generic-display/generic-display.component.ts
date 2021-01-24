import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Generic } from 'src/app/models/Generic.model'

@Component({
  selector: 'app-generic-display',
  templateUrl: './generic-display.component.html',
  styleUrls: ['./generic-display.component.css']
})
export class GenericDisplayComponent implements OnInit {
  data: Generic[]= [];
  request:any;
  url = 'http://localhost:3000/'
  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.http.get(this.url + 'weather').subscribe(res => {
      this.request = res;
      this.request.forEach(element => {
        this.data.push(element);
      });
   })
  }
}
