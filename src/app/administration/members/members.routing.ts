import {Routes, RouterModule} from '@angular/router';
import {MembersComponent} from "./members.component";
import {MemberDetailsComponent} from "./member-details/member-details.component";
import {MemberActivationComponent} from "./member-activation/member-activation.component";

const routes: Routes = [
    {
        path: "", component: MembersComponent
    },
    {
        path: 'activation', component: MemberActivationComponent
    },
    {
        path: ':id', component: MemberDetailsComponent
    }
];

export const MembersRoute = RouterModule.forChild(routes);
