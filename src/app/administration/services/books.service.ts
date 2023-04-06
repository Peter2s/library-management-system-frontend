import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService implements OnInit{

  constructor(private ApiService: ApiService) { }
  
  ngOnInit(): void {
  }
  

}
