import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BooksComponent} from "./books.component";
import {BooksRoutes} from "./books.routing";
import {BookItemComponent} from "./bookItem/bookItem.component";
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import {BookDetailsComponent} from './book-details/book-details.component';
import {CreateBookComponent} from "./CreateBook/CreateBook.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BooksListComponent} from './books-list/books-list.component';
import {TableModule} from 'primeng/table';
import {SearchBookComponent} from './search-book/search-book.component';


@NgModule({
    imports: [CommonModule, BooksRoutes, ReactiveFormsModule, PaginatorModule, SkeletonModule, TableModule],
    declarations: [BooksComponent, BookItemComponent, BookDetailsComponent, CreateBookComponent, BooksListComponent, SearchBookComponent],

})
export class BooksModule {
}
