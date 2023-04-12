import { Routes, RouterModule } from '@angular/router';
import {MembersComponent} from "./members.component";
import {MemberDetailsComponent} from "./member-details/member-details.component";
import {MemberAddComponent} from "./member-add/member-add.component";
import {MemberDeleteComponent} from "./member-delete/member-delete.component";
import {MemberUpdateComponent} from "./member-update/member-update.component";
import {MemberActivationComponent} from "./member-activation/member-activation.component";

const routes: Routes = [
    {
        path:"", component:MembersComponent
    },
    {
        path:'create',component:MemberAddComponent
    },
    {
        path: 'activation', component: MemberActivationComponent
    },
    {
        path: ':id/delete', component: MemberDeleteComponent
    },
    {
        path: ':id/edit', component: MemberUpdateComponent
    },
    {
        path: ':id', component: MemberDetailsComponent
    }
];

export const MembersRoute = RouterModule.forChild(routes);
