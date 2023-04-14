import {Component} from '@angular/core';
import {IBooks} from "../../../models/IBooks";
import {BooksService} from "../../services/books.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {IBooksResponse} from "../../../models/IBooksResponse";

@Component({
    selector: 'app-search-book',
    templateUrl: './search-book.component.html',
    styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent {
    books: IBooks[] = [];

    constructor(private booksService: BooksService, public activeRoute: ActivatedRoute, private messagesService: MessageService) {
    }

    ngOnInit() {
        console.log(this.activeRoute.snapshot);
        if (this.activeRoute.snapshot.params['title'])
            this.booksService.search('year', 2023).subscribe((response: IBooksResponse) => {
                this.books = response.data;
                console.log(this.books);
            });
        else
            this.messagesService.add({severity: 'error', summary: 'Error', detail: 'No Publisher name found'});
    }
}
