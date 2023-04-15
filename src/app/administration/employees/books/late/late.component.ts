import { Component } from "@angular/core";
import { BooksService } from "../../../services/books.service";
import { IBooks } from "../../../../models/IBooks";
import { IBooksResponse } from "../../../../models/IBooksResponse";

@Component({
  selector: "app-late",
  templateUrl: "./late.component.html",
  styleUrls: ["./late.component.css"],
})
export class LateComponent {
  books: IBooks[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService.lateBooks().subscribe((response: IBooksResponse) => {
      this.books = response.data;
    });
  }
}
