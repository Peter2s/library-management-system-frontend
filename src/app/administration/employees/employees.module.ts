import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";

import { EmployeesRoutingModule } from "./employees-routing.module";
import { GetEmployeeComponent } from "./get-employee/get-employee.component";
import { PaginatorModule } from "primeng/paginator";
import { SkeletonModule } from "primeng/skeleton";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { MessagesModule } from "primeng/messages";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { EmployeesComponent } from "./employees.component";

@NgModule({
  declarations: [EmployeesComponent, GetEmployeeComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PaginatorModule,
    SkeletonModule,
    NgOptimizedImage,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    ToastModule,
  ],
})
export class EmployeesModule {}
