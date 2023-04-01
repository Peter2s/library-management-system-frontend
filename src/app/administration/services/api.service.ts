import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { HttpOptions } from "src/app/models/http-options";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private baseUrl = "https://dummyjson.com";

  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.baseUrl + endpoint;
    return this.http.get<T>(url).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  post<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
    const url = this.baseUrl + endpoint;
    return this.http
      .post<T>(url, data)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  put<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
    const url = this.baseUrl + endpoint;
    return this.http
      .put<T>(url, data)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    const url = this.baseUrl + endpoint;
    return this.http
      .delete<T>(url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred";
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}