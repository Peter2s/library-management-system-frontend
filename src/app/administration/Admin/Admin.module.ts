import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AdminComponent } from './Admin.component';
import {AdminRoute} from "./Admin.routing";
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ReactiveFormsModule} from "@angular/forms";
import { AddAdminComponent } from './add-admin/add-admin.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoute,
    PaginatorModule,
    SkeletonModule,
    NgOptimizedImage,
    ProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  declarations: [AdminComponent, AddAdminComponent]
})
export class AdminModule { }
