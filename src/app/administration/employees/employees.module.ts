import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmployeesRoutingModule } from "./employees-routing.module";
import { LateComponent } from "./books/late/late.component";
import { AvailableComponent } from "./books/available/available.component";
import { BorrowingComponent } from "./books/borrowing/borrowing.component";
import { ReadingComponent } from "./books/reading/reading.component";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";
import {EmployeesComponent} from "./employees.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DropdownModule} from "primeng/dropdown";
import {DialogModule} from "primeng/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    LateComponent,
    AvailableComponent,
    BorrowingComponent,
    ReadingComponent,
    EmployeesComponent
  ],
  imports: [CommonModule, EmployeesRoutingModule, SharedModule, TableModule, ConfirmDialogModule, DropdownModule, DialogModule, ReactiveFormsModule, ToastModule],
})
export class EmployeesModule {}
