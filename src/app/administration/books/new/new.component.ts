import {Component} from '@angular/core';
import {IBooks} from "../../../models/IBooks";
import {BooksService} from "../../services/books.service";
import {IBooksResponse} from "../../../models/IBooksResponse";

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.css']
})
export class NewComponent {
    books: IBooks[] = [];

    constructor(private booksService: BooksService) {
    }

    ngOnInit() {
        this.booksService.getNewBooks().subscribe((response: IBooksResponse) => {
            this.books = response.data;
            console.log(this.books);
        });
    }
}
