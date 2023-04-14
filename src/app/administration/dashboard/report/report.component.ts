import {Component} from '@angular/core';
import {IBooks} from "../../../models/IBooks";
import {BooksService} from "../../services/books.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {IBooksResponse} from "../../../models/IBooksResponse";
import {BorrowedBook, BorrowedBooks} from "../../../models/book-response";

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],
    providers: [MessageService]
})
export class ReportComponent {
    logs: BorrowedBook[] = [];

    constructor(private booksService: BooksService, public activeRoute: ActivatedRoute, private messagesService: MessageService) {
    }

    ngOnInit() {
        console.log(this.activeRoute.snapshot);

        this.booksService.getReports().subscribe((response: BorrowedBooks) => {
            this.logs = response.data;
            console.log(this.logs);
        }, error => {
            console.log(error);
            this.messagesService.add({severity: 'error', summary: 'Error', detail: error.error.message});
        });
    }
}
