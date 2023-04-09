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


  getCategories(){
    return this.ApiService.get('/categories');
  }
  
  getReports(){
    return this.ApiService.get('/reports');
  }

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
    return this.ApiService.post<IBooksResponse>("/books", book,options);
  }
  bookCategories() {
    this.ApiService.get<any>("/categories");
  }
  
  getBookById(id:number):Observable<IBooks>{
    let options: HttpOptions = {
      params: {
        id: id?.toString() ?? '',
      },
    }
    return this.ApiService.get<IBooks>(`/books/${id}`);
  }


  updateBook(book: IBooks): Observable<IBooks> {
    return this.ApiService.patch<IBooks>(`/books/${book._id}`, book);
  }

  deleteBook(id: number): Observable<IBooks> {
    return this.ApiService.delete<IBooks>(`/books/${id}`);
  }

  getBooksByAuthor(author: string): Observable<IBooksResponse> {
    return this.ApiService.get<IBooksResponse>(`/books/author/${author}`);
  }

  getBooksByPublisher(publisher: string): Observable<IBooksResponse> {
    return this.ApiService.get<IBooksResponse>(
      `/books/publisher/${publisher}`
    );
  }

  getBooksByTitle(title: string): Observable<IBooksResponse> {
    return this.ApiService.get<IBooksResponse>(`/books/title/${title}`);
  }

  getAvailabileBooks(): Observable<IBooksResponse> {
    return this.ApiService.get<IBooksResponse>(
      `/books/available/`
    );
  }
  
  getBorrwingBooks(): Observable<IBooksResponse> {
    return this.ApiService.get<IBooksResponse>(
      `/books/borrowing/`
    );
  }
  
  getNewBooks(): Observable<IBooksResponse> {
    return this.ApiService.get<IBooksResponse>(
      `/books/new/`
    );
  }

  getMostBorrowed(year:number|string=''): Observable<IBooksResponse> {
    let url = `/books/mostborrowed/`;
    // if(Number(year) && Number(month))
    //   url = `/books/mostborrowed/${year}/${month}`;
    // else 
    if (Number(year))
      url = `/books/mostborrowed/${year}`;
    else
      url = `/books/mostborrowed/`;
    return this.ApiService.get<IBooksResponse>(url);
  }

  getMostReading(year:number|string='' ): Observable<IBooksResponse> {
    let url = `/books/mostborrowed/`;
    // if(Number(year) && Number(month))
    //   url = `/books/mostborrowed/${year}/${month}`;
    // else 
    if (Number(year))
      url = `/books/mostborrowed/${year}`;
    else
      url = `/books/mostborrowed/`;
    return this.ApiService.get<IBooksResponse>(url);
  }

  borrowBook(data:any){
    return this.ApiService.post('/books/borrow',data);
  }

  returnBorrowBook(data:any){
    return this.ApiService.delete('/books/borrow',data);
  }

  readBook(data:any){
    return this.ApiService.post('/books/read',data);
  }

  returnReadBook(data:any){
    return this.ApiService.delete('/books/read',data);
  }

  lateBooks(): Observable<IBooksResponse>{
    return this.ApiService.get('/books/late');
  }

  getCurrentBorrow(): Observable<IBooksResponse>{
    return this.ApiService.get(`/books/currentborrow`);
  }

  search(): Observable<IBooksResponse>{
    return this.ApiService.get('/books/search');
  }

  borrowHistory(year:number|string='' ,month:number|string=''): Observable<IBooksResponse>{
    let url = `/books/history/borrowed/`;
    if(Number(year) && Number(month))
      url = `/books/mostborrowed/${year}/${month}`;
    else if (Number(year))
      url = `/books/mostborrowed/${year}`;
    else
      url = `/books/mostborrowed/`;
    return this.ApiService.get(url);
  }

  readHistory(year:number|string='' ,month:number|string=''): Observable<IBooksResponse>{
    let url = `/books/history/reading/`;
    if(Number(year) && Number(month))
      url = `/books/mostborrowed/${year}/${month}`;
    else if (Number(year))
      url = `/books/mostborrowed/${year}`;
    else
      url = `/books/mostborrowed/`;
    return this.ApiService.get(url);
  }

}
