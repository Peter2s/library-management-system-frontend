import { Component } from "@angular/core";
import { BooksService } from "../../../services/books.service";
import { IBooks } from "../../../../models/IBooks";
import { IBooksResponse } from "../../../../models/IBooksResponse";

@Component({
  selector: "app-borrowing",
  templateUrl: "./borrowing.component.html",
  styleUrls: ["./borrowing.component.css"],
})
export class BorrowingComponent {
  books: IBooks[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService
      .getBorrwingBooks()
      .subscribe((response: IBooksResponse) => {
        this.books = response.data;
      });
  }
}
