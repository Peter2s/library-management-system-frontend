import {Routes, RouterModule} from "@angular/router";
import {AdminComponent} from "./Admin.component";
import {GetAdminComponent} from "./get-admin/get-admin.component";

let id;
const routes: Routes = [
    {
        path: "",
        component: AdminComponent,
    },

    {
        path: ":id",
        component: GetAdminComponent,
    },
];

export const AdminRoute = RouterModule.forChild(routes);
