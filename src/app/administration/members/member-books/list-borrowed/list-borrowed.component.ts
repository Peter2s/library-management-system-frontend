import {Component} from '@angular/core';
import {IBooks} from "../../../../models/IBooks";
import {BooksService} from "../../../services/books.service";
import {IBooksResponse} from "../../../../models/IBooksResponse";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-list-borrowed',
    templateUrl: './list-borrowed.component.html',
    styleUrls: ['./list-borrowed.component.css'],
    providers: [MessageService]
})
export class ListBorrowedComponent {
    books: IBooks[] = [];

    constructor(private booksService: BooksService, private messageService: MessageService) {
    }

    ngOnInit() {
        this.booksService.getListBorrowed().subscribe((response: IBooksResponse) => {
            this.books = response.data;
            console.log(this.books);
        }, (error) => {
            // console.log(error.message.error);
            this.messageService.add(
                {
                    key: 'error',
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message.error,
                    life: 5000
                });
        });
    }
}
