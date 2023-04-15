import {Injectable, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {IBooksResponse} from "src/app/models/IBooksResponse";
import {HttpOptions} from 'src/app/models/IHttp-options';
import {IBooks} from 'src/app/models/IBooks';
import {AuthService} from './auth.service';
import {HttpHeaders} from '@angular/common/http';
import {BookResponse, BorrowedBooks} from 'src/app/models/book-response';

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

    ngOnInit(): void {
    }


    getCategories() {
        return this.ApiService.get('/categories');
    }

    getReports(): Observable<BorrowedBooks> {
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
        console.log(options);
        let endpoint = "/books?"
        if (page) endpoint += `&page=${page}`
        if (limit) endpoint += `&limit=${limit}`
        // return this.ApiService.get<IBooksResponse>("/books", options);
        return this.ApiService.get<IBooksResponse>(endpoint, options);
    }

    addBook(book: IBooks): Observable<BookResponse> {
        const options: HttpOptions = {
            headers: this.httpHeaders,
        };
        console.log(book)
        return this.ApiService.post<BookResponse>("/books", book, options);
    }

    bookCategories() {
        this.ApiService.get<any>("/categories");
    }

    getBookById(id: number): Observable<BookResponse> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.get<BookResponse>(`/books/${id}`, options);
    }


    updateBook(book: IBooks): Observable<IBooks> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }

        return this.ApiService.patch<IBooks>(`/books/${book._id}`, book, options);
    }

    deleteBook(id: number): Observable<IBooks> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.delete<IBooks>(`/books/${id}`);
    }

    getBooksByAuthor(author: string): Observable<IBooksResponse> {

        return this.ApiService.get<IBooksResponse>(`/author/${author}`);
    }

    getBooksByPublisher(publisher: string): Observable<IBooksResponse> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.get<IBooksResponse>(
            `/publisher/${publisher}`
        );
    }

    getBooksByTitle(title: string): Observable<IBooksResponse> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.get<IBooksResponse>(`/title/${title}`);
    }

    getAvailabileBooks(): Observable<IBooksResponse> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.get<IBooksResponse>(
            `/books/available/`
        );
    }

    getBorrwingBooks(): Observable<IBooksResponse> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.get<IBooksResponse>(
            `/books/borrowing/`
        );
    }

    getNewBooks(): Observable<IBooksResponse> {
        return this.ApiService.get<IBooksResponse>(
            `/books/new/`
        );
    }

    getLatestBooks(): Observable<IBooksResponse> {
        return this.ApiService.get<IBooksResponse>(
            `/latest/`
        );
    }


    getMostBorrowed(year: number | string = ''): Observable<IBooksResponse> {

        let url = '';
        if (Number(year))
            url = `/most/borrowed/${year}`;
        else
            url = `/most/borrowed/`;
        return this.ApiService.get<IBooksResponse>(url);
    }

    getMostReading(year: number | string = ''): Observable<IBooksResponse> {

        let url = '';
        if (Number(year))
            url = `/most/read/${year}`;
        else
            url = `/most/read/`;
        return this.ApiService.get<IBooksResponse>(url);
    }

    getListBorrowed(year: number | string = '', month: number | string = ''): Observable<IBooksResponse> {

        let url = '';
        if (Number(year)) {
            url = `/books/history/borrowed/${year}`;
            if (Number(month))
                url += `/${month}`;
        } else
            url = `/books/history/borrowed/`;
        return this.ApiService.get<IBooksResponse>(url);
    }

    getListRead(year: number | string = '', month: number | string = ''): Observable<IBooksResponse> {

        let url = '';
        if (Number(year)) {
            url = `/books/history/reading/${year}`;
            if (Number(month))
                url += `/${month}`;
        } else
            url = `/books/history/reading/`;
        return this.ApiService.get<IBooksResponse>(url);
    }


    borrowBook(data: any) {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.post('/books/borrow', data);
    }

    returnBorrowBook(data: any) {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.delete('/books/borrow', data);
    }

    readBook(data: any) {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.post('/books/read', data);
    }

    returnReadBook(data: any) {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.delete('/books/read', data);
    }

    lateBooks(): Observable<IBooksResponse> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.get('/books/late');
    }

    getCurrentBorrow(): Observable<IBooksResponse> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        return this.ApiService.get(`/books/currentborrow`);
    }

    search(searchBy: String, value: String | number | boolean): Observable<IBooksResponse> {

        return this.ApiService.get(`/books/search?${searchBy}=${value}`);
    }

    borrowHistory(year: number | string = '', month: number | string = ''): Observable<IBooksResponse> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        let url = `/books/history/borrowed/`;
        if (Number(year) && Number(month))
            url = `/books/mostborrowed/${year}/${month}`;
        else if (Number(year))
            url = `/books/mostborrowed/${year}`;
        else
            url = `/books/mostborrowed/`;
        return this.ApiService.get(url);
    }

    readHistory(year: number | string = '', month: number | string = ''): Observable<IBooksResponse> {
        let options: HttpOptions = {
            headers: this.httpHeaders,
        }
        let url = `/books/history/reading/`;
        if (Number(year) && Number(month))
            url = `/books/mostborrowed/${year}/${month}`;
        else if (Number(year))
            url = `/books/mostborrowed/${year}`;
        else
            url = `/books/mostborrowed/`;
        return this.ApiService.get(url);
    }

}
