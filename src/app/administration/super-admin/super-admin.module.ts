import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { SuperAdminRoute } from "./super-admin.routing";
import { GetSuperAdminComponent } from "./get-super-admin/get-super-admin.component";
import { SuperAdminComponent } from "./super-admin.component";
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

@NgModule({
  declarations: [SuperAdminComponent, GetSuperAdminComponent],
  imports: [
    CommonModule,
    SuperAdminRoute,
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
export class SuperAdminModule {}
