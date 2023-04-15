import { Component } from "@angular/core";
import { BooksService } from "../../../services/books.service";
import { IBooks } from "../../../../models/IBooks";
import { IBooksResponse } from "../../../../models/IBooksResponse";

@Component({
  selector: "app-available",
  templateUrl: "./available.component.html",
  styleUrls: ["./available.component.css"],
})
export class AvailableComponent {
  books: IBooks[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService
      .getAvailabileBooks()
      .subscribe((response: IBooksResponse) => {
        this.books = response.data;
      });
  }
}
