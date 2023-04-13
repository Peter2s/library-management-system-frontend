import {Routes, RouterModule} from "@angular/router";
import {AdminComponent} from "./Admin.component";
import {AddAdminComponent} from "./add-admin/add-admin.component";
import {GetAdminComponent} from "./get-admin/get-admin.component";
import {UpdateAdminComponent} from "./update-admin/update-admin.component";

let id;
const routes: Routes = [
    {
        path: "",
        component: AdminComponent,
    },
    {
        path: "create",
        component: AddAdminComponent,
    },
    {
        path: ":id",
        component: GetAdminComponent,
    },
    {
        path: ":id/edit",
        component: UpdateAdminComponent,
    },
];

export const AdminRoute = RouterModule.forChild(routes);
