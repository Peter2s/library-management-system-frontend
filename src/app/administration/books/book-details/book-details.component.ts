import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { IBooks } from 'src/app/models/IBooks';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.css"],
})
export class BookDetailsComponent implements OnInit {
  @Input() public bookItem!: IBooks;
  borrowModalVisible: boolean = false;

  constructor(private bookApi: BooksService, private link: ActivatedRoute) {}
  ngOnInit() {
    this.bookApi
      .getBookById(this.link.snapshot.params["id"])
      .subscribe((data) => {
        this.bookItem = data.data;
      });
  }
  showBorrowForm() {
    this.borrowModalVisible = true;
    console.log(this.borrowModalVisible);
  }
}
