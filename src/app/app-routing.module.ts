import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404Component} from './shared/Error404/Error404.component';
import {AllBooksComponent} from "./_test/books/all-books/all-books.component";
import {LatestComponent} from "./books/latest/latest.component";
import {MostBorrowedComponent} from "./books/most-borrowed/most-borrowed.component";
import {MostReadingComponent} from "./books/most-reading/most-reading.component";
import {BooksComponent} from "./administration/books/books.component";


const routes: Routes = [
    {
        path: "admin",
        loadChildren: () => import('./administration/administration.module').then(m => m.administrationModule),
    },
    {
        path: "books",
        component: BooksComponent,
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
        path: "home",
        component: AllBooksComponent
    },

    {path: "**", component: Error404Component},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
