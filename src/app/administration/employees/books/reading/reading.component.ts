import { Component } from "@angular/core";
import { BooksService } from "../../../services/books.service";
import { IBooks } from "../../../../models/IBooks";
import { IBooksResponse } from "../../../../models/IBooksResponse";

@Component({
  selector: "app-reading",
  templateUrl: "./reading.component.html",
  styleUrls: ["./reading.component.css"],
})
export class ReadingComponent {
  books: IBooks[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService.getBooks().subscribe((response: IBooksResponse) => {
      this.books = response.data;
    });
  }
}
