import { Component, OnDestroy, OnInit } from "@angular/core";
import { IBooks } from "src/app/models/IBooks";
import { BooksService } from "../../services/books.service";
import { LoadingService } from "src/app/shared/services/loading.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { MessageService } from 'primeng/api';

@Component({
  selector: "table-customers-demo",
  templateUrl: "books-list.component.html",
  styleUrls: ["books-list.component.css"],
})
export class BooksListComponent implements OnInit, OnDestroy {
  /** book model */
  books: IBooks[] = [];
  /** Pagination */
  currentPage: number;
  itemsPerPage: number;
  totalRecords: number;
  rowsPerPageOptions: number[];
  /** Observable */
  subscription: Subscription[] = [];

  selectedBooks: IBooks[] = [];

  statuses: any[] = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  representatives: any;

  constructor(
    private booksService: BooksService,
    public loadingService: LoadingService,
    public route: ActivatedRoute
  ) {
    this.currentPage = 1;
    this.itemsPerPage = 8;
    this.totalRecords = 0;
    this.rowsPerPageOptions = [
      this.itemsPerPage,
      this.itemsPerPage * 2,
      this.itemsPerPage * 5,
      this.itemsPerPage * 10,
    ];
  }

  ngOnInit() {
    this.currentPage = this.route.snapshot.queryParams["page"] || 1;
    this.itemsPerPage = this.route.snapshot.queryParams["limit"] || 8;
    this.loadBooks();
    this.representatives = [
      { name: "Amy Elsner", image: "amyelsner.png" },
      { name: "Anna Fali", image: "annafali.png" },
      { name: "Asiya Javayant", image: "asiyajavayant.png" },
      { name: "Bernardo Dominic", image: "bernardodominic.png" },
      { name: "Elwin Sharvill", image: "elwinsharvill.png" },
      { name: "Ioni Bowcher", image: "ionibowcher.png" },
      { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      { name: "Onyama Limba", image: "onyamalimba.png" },
      { name: "Stephen Shaw", image: "stephenshaw.png" },
      { name: "Xuxue Feng", image: "xuxuefeng.png" },
    ];
  }
  loadBooks() {
    const url = `/books?page=${this.currentPage}&limit=${this.itemsPerPage}`;
    const sub = this.booksService.getBooks(url).subscribe((data) => {
      this.books = data.data;
      this.subscription.push(sub);
      this.totalRecords = data.pagination.total_books_count;
      console.log(data);
    });
  }
  deletebook(event: any) {}
  editbook(event: any) { }
  
  onPageChange(event: any) {
    console.log(event);
    this.currentPage = event.page + 1;
    this.itemsPerPage = event.rows;
    this.loadBooks();
  }

  getNumbersArray(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  deleteSelectedBooks() {}
  openNew() {}
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
