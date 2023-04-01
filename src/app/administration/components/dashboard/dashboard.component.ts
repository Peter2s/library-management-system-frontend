import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private api:ApiService ) { }

  ngOnInit() {
    this.api.get<string>("/products").subscribe({
      next: (res) => {
        console.log(res);
      }
    });

    this.api.delete<string>("/products/1").subscribe({
      next: (res) => {
        console.log(res);
      },
    });




  }

}
