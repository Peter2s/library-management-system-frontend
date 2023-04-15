import {Routes, RouterModule} from '@angular/router';
import {BookDetailsComponent} from './book-details/book-details.component';
import {AllBooksComponent} from "./all-books/all-books.component";
import {AuthorsComponent} from "./authors/authors.component";
import {PublishersComponent} from "./publishers/publishers.component";
import {NewComponent} from "./new/new.component";
import {LateComponent} from "./emp-books/late/late.component";
import {AvailableComponent} from "./emp-books/available/available.component";
import {ReadingComponent} from "./emp-books/reading/reading.component";
import {BorrowingComponent} from "./emp-books/borrowing/borrowing.component";
import {CurrentBorrowedComponent} from "../members/member-books/current-borrowed/current-borrowed.component";
import {ListBorrowedComponent} from "../members/member-books/list-borrowed/list-borrowed.component";
import {ListReadingComponent} from "../members/member-books/list-reading/list-reading.component";


const routes: Routes = [
  {
    path: "",
    component: AllBooksComponent,
  },
  {
    path: "new",
    component: NewComponent,
  },
  {
    path: "authors/:title",
    component: AuthorsComponent, // public
  },
  {
    path: "publishers/:title",
    component: PublishersComponent, // public
  },
  { path: "available", component: AvailableComponent }, // for emp
  { path: "borrowing", component: BorrowingComponent }, // for emp
  { path: "reading", component: ReadingComponent }, // for emp
  { path: "late", component: LateComponent }, // for emp
  {
    path: ":id",
    component: BookDetailsComponent,
  },
];

export const BooksRoutes = RouterModule.forChild(routes);
