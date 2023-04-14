import { Routes, RouterModule } from "@angular/router";
import { SuperAdminComponent } from "./super-admin.component";
import { GetSuperAdminComponent } from "./get-super-admin/get-super-admin.component";

let id;
const routes: Routes = [
  {
    path: "",
    component: SuperAdminComponent,
  },
  {
    path: ":id",
    component: GetSuperAdminComponent,
  },
];

export const SuperAdminRoute = RouterModule.forChild(routes);
