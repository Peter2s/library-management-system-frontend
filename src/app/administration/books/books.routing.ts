import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CreateBookComponent } from './CreateBook/CreateBook.component';
import { BooksListComponent } from './books-list/books-list.component';
import {AllBooksComponent} from "../../_test/books/all-books/all-books.component";


const routes: Routes = [
  { 
    path:"", component:BooksComponent
  },
   
  {path:'create',component:CreateBookComponent},
  {path:'list',component:BooksListComponent},
  {path:'new',component:AllBooksComponent},



  
  {
    path: ':id',
    component: BookDetailsComponent
  },
];

export const BooksRoutes = RouterModule.forChild(routes);
