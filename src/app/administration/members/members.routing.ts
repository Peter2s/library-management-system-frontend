import { Routes, RouterModule } from '@angular/router';
import {MembersComponent} from "./members.component";
import {MemberDetailsComponent} from "./member-details/member-details.component";
import {MemberAddComponent} from "./member-add/member-add.component";

let id;
const routes: Routes = [
    {
        path:"", component:MembersComponent
    },
    {
        path:'create',component:MemberAddComponent
    },
    {
        path: ':id', component: MemberDetailsComponent
    }
];

export const MembersRoute = RouterModule.forChild(routes);
