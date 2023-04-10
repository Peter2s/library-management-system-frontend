import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./Admin.component";
import {AddAdminComponent} from "./add-admin/add-admin.component";


let id;
const routes: Routes = [
    {
        path:"", component:AdminComponent
    },
    {
        path:'add',component:AddAdminComponent
    },
    // {
    //     path: ':id', component: MemberDetailsComponent
    // }
];

export const AdminRoute = RouterModule.forChild(routes);
