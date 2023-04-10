import { Component,OnInit  } from '@angular/core';
import { IBooks } from 'src/app/models/IBooks';
import { BooksService } from '../../services/books.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit{
  books: IBooks[] = [];
  subscription: Subscription[] = [];
  first:number = 0;
  rows:number = 8;
  current: number= 1;
  pages: number = 1;
  totalRecords: number = 0;
  rowsPerPageOptions: number[]=[
    this.rows,
    this.rows * 2,
    this.rows * 3,
  ];
  constructor(private bookService: BooksService, public loadingService: LoadingService) {
    
  }
  ngOnInit(): void {
    const sub = this.bookService.getBooks('/books').subscribe((data) => {
      this.books = data.data;
      this.totalRecords = data.pagination.total_books_count;
      this.current = data.pagination.current;
      this.pages = data.pagination.pages;
      console.log(this.current,this.pages,this.totalRecords)
      this.subscription.push(sub);
      console.log(data);
    });
  }
  onPageChange(event: any) {
    console.log(event);
    this.bookService.getBooks('/books').subscribe((data) => {
      this.books = data.data;
      this.totalRecords = data.pagination.total_books_count;
      this.current = data.pagination.current;
      this.pages = data.pagination.pages;
      console.log(this.current,this.pages,this.totalRecords)
      console.log(data);
    });
  }
  next() {
      this.first = this.first + this.rows;
  }
  prev() {
      this.first = this.first - this.rows;
    }
  reset() {
        this.first = 0;
    }

  isLastPage(): boolean {
      return this.current ==this.pages ? true : false;
  }

  isFirstPage(): boolean {
      return this.current ? this.first === 0 : true;
  }
  getNumbersArray(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  
  
}
