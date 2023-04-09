import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CreateBookComponent } from './CreateBook/CreateBook.component';


const routes: Routes = [
  { 
    path:"", component:BooksComponent
  },
   {
    path: ':id',
    component: BookDetailsComponent
  },
  {path:'create',component:CreateBookComponent}
];

export const BooksRoutes = RouterModule.forChild(routes);
