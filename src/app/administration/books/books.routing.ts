import {Routes, RouterModule} from '@angular/router';
import {BookDetailsComponent} from './book-details/book-details.component';
import {AllBooksComponent} from "../../_test/books/all-books/all-books.component";
import {AuthorsComponent} from "./authors/authors.component";
import {PublishersComponent} from "./publishers/publishers.component";
import {ReportComponent} from "../dashboard/report/report.component";
import {NewComponent} from "./new/new.component";


const routes: Routes = [
    {
        path: "", component: AllBooksComponent
    },
    {
        path: "report", component: ReportComponent
    },
    {
        path: "new", component: NewComponent
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
        path: ':id',
        component: BookDetailsComponent
    },

];

export const BooksRoutes = RouterModule.forChild(routes);
