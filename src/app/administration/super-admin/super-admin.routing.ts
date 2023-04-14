import { Routes, RouterModule } from "@angular/router";
import { SuperAdminComponent } from "./super-admin.component";

let id;
const routes: Routes = [
  {
    path: "",
    component: SuperAdminComponent,
  },
];

export const SuperAdminRoute = RouterModule.forChild(routes);
