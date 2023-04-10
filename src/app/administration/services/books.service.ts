import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IBooksResponse } from "src/app/models/IBooksResponse";
import { HttpOptions } from 'src/app/models/IHttp-options';
import { IBooks } from 'src/app/models/IBooks';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class BooksService implements OnInit {
  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {}

  getBooks(url:string): Observable<IBooksResponse> {
   
    return this.ApiService.get<IBooksResponse>(url);
  }
  addBook(book: IBooks) {
    return this.ApiService.post<IBooksResponse>("/books", book);
  }
  bookCategories(): Observable<any> {
    return this.ApiService.get<any>("/categories");
  }
}
