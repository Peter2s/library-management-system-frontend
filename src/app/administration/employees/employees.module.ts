import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmployeesRoutingModule } from "./employees-routing.module";
import { LateComponent } from "./books/late/late.component";
import { AvailableComponent } from "./books/available/available.component";
import { BorrowingComponent } from "./books/borrowing/borrowing.component";
import { ReadingComponent } from "./books/reading/reading.component";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";

@NgModule({
  declarations: [
    LateComponent,
    AvailableComponent,
    BorrowingComponent,
    ReadingComponent,
  ],
  imports: [CommonModule, EmployeesRoutingModule, SharedModule, TableModule],
})
export class EmployeesModule {}
