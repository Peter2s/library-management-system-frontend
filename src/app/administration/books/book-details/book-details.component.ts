import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { IBooks } from 'src/app/models/IBooks';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  public bookItem!: IBooks;
  
  constructor(private bookApi: BooksService,private link:ActivatedRoute) {
    this.bookItem = {
      _id: 5,
      title: 'string',
      author: 'string',
      publisher: 'string',
      category: 'string',
      publishingDate:  new Date(),
      pages: 5,
      noOfCopies: 6,
      shelfNo: 6,
      available: 4,
      borrowedCopies: 5,
      created_at:  new Date(),
      updated_at:  new Date(),
    }
  }
  ngOnInit() {
    this.bookApi.getBookById(this.link.snapshot.params['id']).subscribe((data) => {
      console.log('getBookById',data);
      // this.bookItem = data;
      this.bookItem = {
        _id: 5,
        title: 'string',
        author: 'string',
        publisher: 'string',
        category: 'string',
        publishingDate:  new Date(),
        pages: 5,
        noOfCopies: 6,
        shelfNo: 6,
        available: 4,
        borrowedCopies: 5,
        created_at:  new Date(),
        updated_at:  new Date(),
      }
    });
  }


}
