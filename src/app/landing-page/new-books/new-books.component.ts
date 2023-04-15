import { Component, OnInit, OnDestroy} from '@angular/core';
import { BooksService } from "../../administration/services/books.service";
import { IBooks } from "src/app/models/IBooks";
import {IBooksResponse} from "../../models/IBooksResponse";

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrls: ['./new-books.component.css']
})
export class NewBooksComponent implements OnInit{

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
