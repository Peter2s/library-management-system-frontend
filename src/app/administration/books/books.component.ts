import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { IBooks } from "src/app/models/IBooks";
import { BooksService } from "../services/books.service";
import { Subscription } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
  
export class BooksComponent implements OnInit,OnDestroy {
  /** book model */
  books: IBooks[] = [];
  /** Pagination */
  first: number;
  rows: number;
  totalRecords: number;
  rowsPerPageOptions: number[];
  /** Observable */
  subscription:Subscription[] = [];
  constructor(private booksService: BooksService,public loadingService:LoadingService) {
    this.first = 1;
    this.rows = 8;
    this.totalRecords = 0;
    this.rowsPerPageOptions = [
      this.rows,
      this.rows * 2,
      this.rows * 5,
      this.rows * 10,
    ];
  }
  
  ngOnInit() {
    const sub = this.booksService.getBooks().subscribe((data) => {
      this.books = data.data;
      this.subscription.push(sub);
      this.totalRecords = data.pagination.total_books_count;
      console.log(data);
    });
  }
  
  onPageChange(event: Event) {
    
  }
  
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
