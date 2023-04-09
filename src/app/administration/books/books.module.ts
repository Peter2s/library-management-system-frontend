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



@NgModule({
  imports: [CommonModule, BooksRoutes, ReactiveFormsModule,PaginatorModule, SkeletonModule],
  declarations: [BooksComponent, BookItemComponent, BookDetailsComponent,CreateBookComponent],
  
})
export class BooksModule {}
