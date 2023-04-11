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
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { MessagesModule } from "primeng/messages";
import { MessageService } from "primeng/api";

@NgModule({
  imports: [
    CommonModule,
    BooksRoutes,
    ReactiveFormsModule,
    PaginatorModule,
    SkeletonModule,
    ProgressSpinnerModule,
    AvatarModule,
    TableModule,
    MessagesModule,
    ToastModule,
    ToolbarModule,
    TagModule,
    ButtonModule,
  ],
  declarations: [
    BooksComponent,
    BookItemComponent,
    BookDetailsComponent,
    CreateBookComponent,
    BooksListComponent,
  ],
  providers:[MessageService]
})
export class BooksModule {}
