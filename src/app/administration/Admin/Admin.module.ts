import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { AdminComponent } from "./Admin.component";
import { AdminRoute } from "./Admin.routing";
import { PaginatorModule } from "primeng/paginator";
import { SkeletonModule } from "primeng/skeleton";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ReactiveFormsModule } from "@angular/forms";
import { AddAdminComponent } from "./add-admin/add-admin.component";
import { AdminsItemComponent } from "./admins-item/admins-item.component";
import { ButtonModule } from "primeng/button";
import { GetAdminComponent } from './get-admin/get-admin.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoute,
    PaginatorModule,
    SkeletonModule,
    NgOptimizedImage,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  declarations: [AdminComponent, AddAdminComponent, AdminsItemComponent, GetAdminComponent],
})
export class AdminModule {}
