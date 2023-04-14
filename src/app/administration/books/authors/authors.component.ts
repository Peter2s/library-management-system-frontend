import {Component} from '@angular/core';
import {IBooks} from "../../../models/IBooks";
import {BooksService} from "../../services/books.service";
import {IBooksResponse} from "../../../models/IBooksResponse";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-authors',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.css'],
    providers: [MessageService]
})
export class AuthorsComponent {
    books: IBooks[] = [];

    constructor(private booksService: BooksService, public activeRoute: ActivatedRoute, private messagesService: MessageService) {
        // console.log(this.activeRoute.snapshot);
    }

    ngOnInit() {
        console.log(this.activeRoute.snapshot);
        console.log(this.books);
        if (this.activeRoute.snapshot.params['title']) {
            console.log(this.books);
            this.booksService.getBooksByAuthor(this.activeRoute.snapshot.params['title']).subscribe((response: IBooksResponse) => {
                this.books = response.data;
                console.log(this.books);
            });
        } else
            this.messagesService.add({severity: 'error', summary: 'Error', detail: 'No author name found'});
    }
}
