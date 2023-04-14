import {Component} from '@angular/core';
import {IBooks} from "../../models/IBooks";
import {BooksService} from "../../administration/services/books.service";
import {IBooksResponse} from "../../models/IBooksResponse";

@Component({
    selector: 'app-most-reading',
    templateUrl: './most-reading.component.html',
    styleUrls: ['./most-reading.component.css']
})
export class MostReadingComponent {
    books: IBooks[] = [];

    constructor(private booksService: BooksService) {
    }

    ngOnInit() {
        this.booksService.getMostReading().subscribe((response: IBooksResponse) => {
            this.books = response.data;
            console.log(this.books);
        });
    }
}
