import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeesComponent } from "./employees.component";
import { GetEmployeeComponent } from "./get-employee/get-employee.component";

const routes: Routes = [
  { path: "", component: EmployeesComponent },
  { path: ":id", component: GetEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
