import {Component} from '@angular/core';
import {IBooks} from "../../models/IBooks";
import {BooksService} from "../../administration/services/books.service";
import {IBooksResponse} from "../../models/IBooksResponse";

@Component({
    selector: 'app-most-borrowed',
    templateUrl: './most-borrowed.component.html',
    styleUrls: ['./most-borrowed.component.css']
})
export class MostBorrowedComponent {
    books: IBooks[] = [];

    constructor(private booksService: BooksService) {
    }

    ngOnInit() {
        this.booksService.getMostBorrowed().subscribe((response: IBooksResponse) => {
            this.books = response.data;
            console.log(this.books);
        });
    }
}
