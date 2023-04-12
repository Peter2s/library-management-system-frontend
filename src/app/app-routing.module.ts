import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/Error404/Error404.component';
import {AllBooksComponent} from "./_test/books/all-books/all-books.component";


const routes: Routes = [
  {
    path: "admin",
    loadChildren: () => import('./administration/administration.module').then(m => m.administrationModule),
  },
    {
    path: "home",
    component:AllBooksComponent
    },

  { path: "**", component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
