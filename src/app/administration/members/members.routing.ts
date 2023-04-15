import {Routes, RouterModule} from '@angular/router';
import {MembersComponent} from "./members.component";
import {MemberDetailsComponent} from "./member-details/member-details.component";

const routes: Routes = [
    {
        path: "", component: MembersComponent
    },
    {
        path: ':id', component: MemberDetailsComponent
    }
];

export const MembersRoute = RouterModule.forChild(routes);
