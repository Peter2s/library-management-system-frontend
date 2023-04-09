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
  httpHeaders: any = {};
  constructor(
    private ApiService: ApiService,
    private authService: AuthService
  ) {
    this.httpHeaders = {
      Authorization: "Bearer " + this.authService.token(),
    };
  }

  ngOnInit(): void {}

  getBooks(page?: number, limit?: number): Observable<IBooksResponse> {
    const options: HttpOptions = {
      headers: this.httpHeaders,
      params: {
        page: page?.toString() ?? "",
        limit: limit?.toString() ?? "",
      },
    };
    return this.ApiService.get<IBooksResponse>("/books", options);
  }
  addBook(book: IBooks) {
    const options: HttpOptions = {
      headers: this.httpHeaders,
    };
    return this.ApiService.post<IBooksResponse>("/books", book, options);
  }
  bookCategories() {
    this.ApiService.get<any>("/categories");
  }
}
