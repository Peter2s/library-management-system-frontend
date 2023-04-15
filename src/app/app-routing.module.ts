import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/Error404/Error404.component';
import {AllBooksComponent} from "./_test/books/all-books/all-books.component";
import {MemberActivationComponent} from "./member-activation/member-activation.component";
import {MemberLoginComponent} from "./member-login/member-login.component";
import {LatestComponent} from "./books/latest/latest.component";
import {MostBorrowedComponent} from "./books/most-borrowed/most-borrowed.component";
import {MostReadingComponent} from "./books/most-reading/most-reading.component";
import {BooksComponent} from "./administration/books/books.component";
import {AuthorsComponent} from "./administration/books/authors/authors.component";
import {PublishersComponent} from "./administration/books/publishers/publishers.component";
import {BookDetailsComponent} from "./administration/books/book-details/book-details.component";
import {ReportComponent} from "./administration/dashboard/report/report.component";
import {LoginGuard} from "./administration/guards/login.guard";
import {MemberEditComponent} from "./member-edit/member-edit.component";


const routes: Routes = [
    {
        path: "admin",
        loadChildren: () => import('./administration/administration.module').then(m => m.administrationModule),
    },
    {
        path: "authors/:title",
        // loadChildren: () => import('./administration/books/authors/authors.component').then(mod => mod.AuthorsComponent),
        component: AuthorsComponent
    },
    {
        path: "publishers/:title",
        // loadChildren: () => import('./administration/books/publishers/publishers.component').then(mod => mod.PublishersComponent),
        component: PublishersComponent
    },

    {
        path: "books",
        component: BooksComponent,
    },
    {
        path: "books/:id",
        component: BookDetailsComponent,
    },
    {
        path: "latest",
        component: LatestComponent,
    },
    {
        path: "most/borrowed",
        component: MostBorrowedComponent,
    },
    {
        path: "most/read",
        component: MostReadingComponent,
    },

    {
        path: "activation",
        component: MemberActivationComponent
    },
    {
        path: "login",
        component: MemberLoginComponent,
    },
    {
        path: "home",
        component: AllBooksComponent
    },
    {
        path: "edit",
        component: MemberEditComponent
    },

  { path: "**", component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
