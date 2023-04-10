import { Component, Input, OnInit } from "@angular/core";
import { BooksService } from "../../services/books.service";
import { IBooks } from "src/app/models/IBooks";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.css"],
})
export class BookDetailsComponent implements OnInit {
  @Input() public bookItem!: IBooks;

  constructor(
    private bookApi: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.bookApi.getBookById(id).subscribe((data) => {
      this.bookItem = data.data;
      if (this.bookItem == null) this.router.navigateByUrl("/admin/books");
      console.log(this.bookItem);
    });
  }
}
