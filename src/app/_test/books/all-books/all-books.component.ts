import { Component, OnInit } from '@angular/core';
import { IBooks } from '../../../models/IBooks';
import { BooksService } from '../../../administration/services/books.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {IBooksResponse} from "../../../models/IBooksResponse";
import {BookResponse} from "../../../models/book-response";

@Component({
  selector: 'app-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
  providers: [ConfirmationService, MessageService]
})

export class AllBooksComponent implements OnInit  {

  books: IBooks[];
  book: IBooks;
  displayDialog: boolean;
  loading: boolean;
    totalBooksCount: number=0;
    first: number=0;
    currentPage: number = 1;
    booksPerPage: number  = 10;
    rowsPerPageOptions: number[] = [10, 25, 50];

  constructor(private booksService: BooksService,
              public confirmationService: ConfirmationService,
              public messageService: MessageService) {
        this.books = [];
        this.book = {} as IBooks;
        this.displayDialog = false;
        this.loading = false;
  }

  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(): void {
    this.loading = true;
    this.booksService.getBooks(this.currentPage,this.booksPerPage).subscribe(
        (response: IBooksResponse) => {
          this.books = response.data;
          this.loading = false;
            this.totalBooksCount = response.pagination.total_books_count;
            // this.currentPage = response.pagination.current;
            // this.booksPerPage = response.pagination.limit;

        }, (error) => {
          this.messageService.add(
              {
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to get books.'
              });
          this.loading = false;
        }
    )
  }
onPageChange(event: any): void {
    console.log(event);
    this.currentPage = event.page+1;
    this.booksPerPage = event.rows;
    this.getBooks();
}
  showDialogToAdd(): void {
    this.book = {} as IBooks;
    this.displayDialog = true;
  }
    editBook(book: IBooks): void {
        this.book = {...book};
        this.displayDialog = true;
    }
    confirmDeleteBook(book: IBooks): void {
        // console.log('confirmDeleteBook.',book)
        this.book = book;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this book?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            accept: () => {
                console.log(book)
                this.deleteConfirmed();
            },


        });
    }
    deleteConfirmed(): void {
        console.log('deleteConfirmed.')
        // this.deleteBook();
        this.confirmationService.close();
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Book deleted.'
        });
        this.getBooks();

    }

    saveBook(): void {
      if (this.book._id) {
      this.booksService.updateBook(this.book).subscribe(
          (response: IBooks) => {
            this.book = response;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Book updated.'
            });
            this.getBooks();
            //   this.books[this.findIndexById(this.book._id)] = this.book;
            this.displayDialog = false;
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update book.'
            });
          }
      );
    } else {
      this.booksService.addBook(this.book).subscribe(
          (response: BookResponse) => {
            this.books.push(response.data);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Book added.'
            });
            this.displayDialog = false;
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add book.'
            });
          }
      );
    }
  }

    deleteBook(): void {
      // console.log('deleteBook')
      // console.log(this.book._id)
        // return;
      if (this.book._id) {
      this.booksService.deleteBook(this.book._id).subscribe(
          () => {
              console.log('deleteBook')
            this.books.splice(this.findIndexById(this.book._id), 1);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Book deleted.'
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete book.'
            });
          }
      );
    }
    this.displayDialog = false;
  }

    cancel(): void {
      this.displayDialog = false;
    }

    onRowSelect(event: { data: IBooks; }): void {
      this.book = event.data;
      this.displayDialog = true;
    }

    findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.books.length; i++) {
        if (this.books[i]._id === id) {
          index = i;
          break;
        }
      }
      return index;
    }

  }


