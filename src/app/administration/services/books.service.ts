import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IBooksResponse } from "src/app/models/IBooksResponse";
import { HttpOptions } from 'src/app/models/IHttp-options';

@Injectable({
  providedIn: "root",
})
export class BooksService implements OnInit {
  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {}
  getBooks(page?: number, limit?: number): Observable<IBooksResponse> {
    let options: HttpOptions = {
      params: {
        page: page?.toString() ?? '',
        limit: limit?.toString() ?? '',
      },
    }
    return this.ApiService.get<IBooksResponse>("/books");
  }
}
