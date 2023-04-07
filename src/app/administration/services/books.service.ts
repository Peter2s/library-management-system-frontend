import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IBooksResponse } from "src/app/models/IBooksResponse";

@Injectable({
  providedIn: "root",
})
export class BooksService implements OnInit {
  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {}
  getBooks(page?: number,limit?:number): Observable<IBooksResponse> {
    return this.ApiService.get<IBooksResponse>("/books");
  }
}
