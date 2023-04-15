import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeesComponent } from "./employees.component";
import { AvailableComponent } from "./books/available/available.component";
import { BorrowingComponent } from "./books/borrowing/borrowing.component";
import { LateComponent } from "./books/late/late.component";
import { ReadingComponent } from "./books/reading/reading.component";

const routes: Routes = [
  { path: "", component: EmployeesComponent },
  { path: "available", component: AvailableComponent },
  { path: "borrowing", component: BorrowingComponent },
  { path: "late", component: LateComponent },
  { path: "reading", component: ReadingComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
