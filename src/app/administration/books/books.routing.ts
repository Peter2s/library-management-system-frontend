import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';

const routes: Routes = [
  { 
    path:"", component:BooksComponent
   },
];

export const BooksRoutes = RouterModule.forChild(routes);
