import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksComponent } from "./books.component";
import { BooksRoutes } from "./books.routing";
import { BookItemComponent } from "./bookItem/bookItem.component";
import { PaginatorModule } from "primeng/paginator";
import { SkeletonModule } from "primeng/skeleton";
import { BookDetailsComponent } from './book-details/book-details.component';
import { CreateBookComponent } from "./CreateBook/CreateBook.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { AvatarModule } from "primeng/avatar";
import { BooksListComponent } from './books-list/books-list.component';
import { TableModule } from 'primeng/table';





@NgModule({
  imports: [
    CommonModule,
    BooksRoutes,
    ReactiveFormsModule,
    PaginatorModule,
    SkeletonModule,
    ProgressSpinnerModule,
    AvatarModule,
    TableModule
  ],
  declarations: [BooksComponent, BookItemComponent, BookDetailsComponent, CreateBookComponent, BooksListComponent],
})

export class BooksModule {}
