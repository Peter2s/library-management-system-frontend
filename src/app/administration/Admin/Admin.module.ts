import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AdminComponent} from "./Admin.component";
import {AdminRoute} from "./Admin.routing";
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {GetAdminComponent} from "./get-admin/get-admin.component";
import {MessagesModule} from "primeng/messages";

import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";

@NgModule({
    imports: [
        AdminRoute,
        CommonModule,
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
    declarations: [
        AdminComponent,
        GetAdminComponent,
    ],
})
export class AdminModule {
}
