import {Routes, RouterModule} from '@angular/router';
import {MembersComponent} from "./members.component";
import {MemberDetailsComponent} from "./member-details/member-details.component";
import {CurrentBorrowedComponent} from "./member-books/current-borrowed/current-borrowed.component";
import {ListBorrowedComponent} from "./member-books/list-borrowed/list-borrowed.component";
import {ListReadingComponent} from "./member-books/list-reading/list-reading.component";

const routes: Routes = [
    {
        path: "", component: MembersComponent
    },
    {path : "current-borrowed" ,component:CurrentBorrowedComponent},
    {path : "borrow-history" ,component:ListBorrowedComponent},
    {path : "read-history" ,component:ListReadingComponent},
    {
        path: ':id', component: MemberDetailsComponent
    }
];

export const MembersRoute = RouterModule.forChild(routes);
