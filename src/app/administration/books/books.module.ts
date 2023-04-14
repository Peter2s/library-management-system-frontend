import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksComponent } from "./books.component";
import { BooksRoutes } from "./books.routing";
import { BookItemComponent } from "./bookItem/bookItem.component";
import { PaginatorModule } from "primeng/paginator";
import { SkeletonModule } from "primeng/skeleton";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { CreateBookComponent } from "./CreateBook/CreateBook.component";
import { ReactiveFormsModule } from "@angular/forms";
import { BooksListComponent } from "./books-list/books-list.component";
import { TableModule } from "primeng/table";
import { SearchBookComponent } from "./search-book/search-book.component";
import { NewComponent } from "./new/new.component";
import { AuthorsComponent } from "./authors/authors.component";
import { PublishersComponent } from "./publishers/publishers.component";
import { BookBorrowComponent } from "./bookBorrow/bookBorrow.component";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";


@NgModule({
  imports: [
    CommonModule,
    BooksRoutes,
    ReactiveFormsModule,
    PaginatorModule,
    SkeletonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    AutoCompleteModule,
    ToastModule,
  ],
  declarations: [
    BooksComponent,
    BookItemComponent,
    BookDetailsComponent,
    CreateBookComponent,
    BooksListComponent,
    SearchBookComponent,
    NewComponent,
    BookBorrowComponent,
    AuthorsComponent,
    PublishersComponent,
  ],
})
export class BooksModule {}
