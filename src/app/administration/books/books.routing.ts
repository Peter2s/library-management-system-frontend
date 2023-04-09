import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CreateBookComponent } from './CreateBook/CreateBook.component';


const routes: Routes = [
  { 
    path:"", component:BooksComponent
  },
   
  {path:'create',component:CreateBookComponent},



  
  {
    path: ':id',
    component: BookDetailsComponent
  },
];

export const BooksRoutes = RouterModule.forChild(routes);
