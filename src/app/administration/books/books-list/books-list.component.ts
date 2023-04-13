import {Component, OnDestroy, OnInit} from "@angular/core";
import {IBooks} from "src/app/models/IBooks";
import {BooksService} from "../../services/books.service";
import {LoadingService} from "src/app/shared/services/loading.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {MessageService} from 'primeng/api';

@Component({
    selector: "table-customers-demo",
    templateUrl: "books-list.component.html",
    styleUrls: ["books-list.component.css"],
})
export class BooksListComponent implements OnInit, OnDestroy {
    /** book model */
    books: IBooks[] = [];
    /** Pagination */
    currentPage: number;
    itemsPerPage: number;
    totalRecords: number;
    rowsPerPageOptions: number[];
    /** Observable */
    subscription: Subscription[] = [];

    selectedBooks: IBooks[] = [];

    loading: boolean = true;
    editing: boolean = false;

    constructor(
        private booksService: BooksService,
        public loadingService: LoadingService,
        public route: ActivatedRoute
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
        // const url = `/books?page=${this.currentPage}&limit=${this.itemsPerPage}`;
        const sub = this.booksService.getBooks(this.currentPage, this.itemsPerPage).subscribe((data) => {
            this.books = data.data;
            this.subscription.push(sub);
            this.totalRecords = data.pagination.total_books_count;
            console.log(data);
        });
    }

    onRowEditInit(book: any) {
        // Perform any initialization logic before editing the row, if needed
        console.log(`Editing book: ${book.title}`);
    }

    onRowEditSave(book: any) {
    }

    onRowEditCancel(book: any) {
    }

    deletebook(event: any) {
    }

    editbook(event: any) {
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

    deleteSelectedBooks() {
    }

    openNew() {
    }

    ngOnDestroy(): void {
        this.subscription.forEach((sub) => sub.unsubscribe());
    }
}
