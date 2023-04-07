import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksComponent } from "./books.component";
import { BooksRoutes } from "./books.routing";
import { BookItemComponent } from "./bookItem/bookItem.component";
import { PaginatorModule } from "primeng/paginator";
import { SkeletonModule } from "primeng/skeleton";


@NgModule({
  imports: [CommonModule, BooksRoutes, PaginatorModule, SkeletonModule],
  declarations: [BooksComponent, BookItemComponent],
  
})
export class BooksModule {}
