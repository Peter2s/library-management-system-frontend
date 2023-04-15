import { Component, OnInit, OnDestroy} from '@angular/core';
import { BooksService } from "../../administration/services/books.service";
import { IBooks } from "src/app/models/IBooks";
import {IBooksResponse} from "../../models/IBooksResponse";

@Component({
  selector: 'app-best-books',
  templateUrl: './best-books.component.html',
  styleUrls: ['./best-books.component.css']
})
export class BestBooksComponent implements OnInit{
  books: IBooks[] = [];

  sliderConfig = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    verticalSwiping: false
  };

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
      this.booksService.getMostBorrowed().subscribe((response: IBooksResponse) => {
          this.books = response.data;
          console.log(this.books);
      });
  }
}
