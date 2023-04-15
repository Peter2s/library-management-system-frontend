import {Component, OnDestroy, OnInit} from "@angular/core";
import {ApiService} from "../services/api.service";
import {IBooks} from "src/app/models/IBooks";
import {BooksService} from "../services/books.service";
import {Subscription} from "rxjs";
import {LoadingService} from "../../shared/services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Action} from "rxjs/internal/scheduler/Action";
import {AuthorizationService} from './../services/Authorization.service';

@Component({
    selector: "app-emp-books",
    templateUrl: "./books.component.html",
    styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit, OnDestroy {
    /** book model */
    books: IBooks[] = [];
    /** Pagination */
    currentPage: number;
    itemsPerPage: number;
    totalRecords: number;
    rowsPerPageOptions: number[];
    /** Observable */
    subscription: Subscription[] = [];

    constructor(
        private booksService: BooksService,
        public loadingService: LoadingService,
        public route: ActivatedRoute,
        private authorization: AuthorizationService
    ) {
        this.currentPage = 1;
        this.itemsPerPage = 8;
        this.totalRecords = 0;
        this.rowsPerPageOptions = [
            this.itemsPerPage,
            this.itemsPerPage * 2,
            this.itemsPerPage * 5,
            this.itemsPerPage * 10,
        ];
    }

    ngOnInit() {
        this.currentPage = this.route.snapshot.queryParams["page"] || 1;
        this.itemsPerPage = this.route.snapshot.queryParams["limit"] || 8;
        this.loadBooks();
    }

    loadBooks() {
        // const url = `/emp-books?page=${this.currentPage}&limit=${this.itemsPerPage}`;
        const sub = this.booksService.getBooks(this.currentPage, this.itemsPerPage).subscribe((data) => {
            this.books = data.data;
            this.subscription.push(sub);
            this.totalRecords = data.pagination.total_books_count;
            console.log(data);
        });
    }

    onPageChange(event: any) {
        console.log(event);
        this.currentPage = event.page + 1;
        this.itemsPerPage = event.rows;
        this.loadBooks();
    }

    getNumbersArray(start: number, end: number): number[] {
        return Array.from({length: end - start + 1}, (_, i) => start + i);
    }

    ngOnDestroy(): void {
        this.subscription.forEach((sub) => sub.unsubscribe());
    }
}
