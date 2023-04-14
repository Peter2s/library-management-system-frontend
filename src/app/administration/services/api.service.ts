import {Injectable} from "@angular/core";
import {
    HttpClient,
    HttpErrorResponse, HttpHeaders,
    HttpInterceptor,
    HttpParams,
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {HttpOptions} from "src/app/models/IHttp-options";
import {IServerError} from '../../models/IServerError';

@Injectable({
    providedIn: "root",
})
export class ApiService {
    private baseUrl = "http://www.nader-mo.tech";

    // private baseUrl = "http://localhost:8000";

    constructor(private http: HttpClient) {
    }

    get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
        const url = this.baseUrl + endpoint;
        return this.http.get<T>(url, options = {}).pipe(retry(2), catchError(this.handleError));
    }

    post<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
        const url = this.baseUrl + endpoint;
        return this.http
            .post<T>(url, data, (options = {}))
            .pipe(retry(2), catchError(this.handleError));
    }

    patch<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
        const url = this.baseUrl + endpoint
        console.log(url);
        console.log(options);
        if (data.image) {
            console.log('data.image');
            console.log(data.image);

            options!.headers = new HttpHeaders({
                'Content-Type': 'multipart/form-data',
                ...options!.headers
            })
            // data.image = data.image.image
        }
        console.log(data);
        console.log(options);
        // console.log(data);

        return this.http
            .patch<T>(url, data, (options = {}))
            .pipe(retry(2), catchError(this.handleError));
    }

    put<T>(endpoint: string, data: any, options?: HttpOptions): Observable<T> {
        const url = this.baseUrl + endpoint;
        return this.http
            .put<T>(url, data, (options = {}))
            .pipe(retry(2), catchError(this.handleError));
    }

    delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
        const url = this.baseUrl + endpoint;
        return this.http
            .delete<T>(url, (options = {}))
            .pipe(retry(2), catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = "An unknown error occurred";
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status} \n  Message: ${error.error.message}`;
        }
        console.error(error);
        console.error(errorMessage);
        return throwError({
            statusCode: error.status,
            message: error.error.message,
        });
    }
}
