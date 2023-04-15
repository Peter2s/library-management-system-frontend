import {Component} from '@angular/core';
import {BooksService} from "../../administration/services/books.service";
import {IBooks} from "../../models/IBooks";
import {IBooksResponse} from "../../models/IBooksResponse";

@Component({
    selector: 'app-latest',
    templateUrl: './latest.component.html',
    styleUrls: ['./latest.component.css']
})
export class LatestComponent {
    books: IBooks[] = [];

    constructor(private booksService: BooksService) {
    }

    ngOnInit() {
        this.booksService.getLatestBooks().subscribe((response: IBooksResponse) => {
            this.books = response.data;
            console.log(this.books);
        });
    }
}
