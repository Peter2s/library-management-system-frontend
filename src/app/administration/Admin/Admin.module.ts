import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AdminComponent} from "./Admin.component";
import {AdminRoute} from "./Admin.routing";
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ReactiveFormsModule} from "@angular/forms";
import {AddAdminComponent} from "./add-admin/add-admin.component";
import {AdminsItemComponent} from "./admins-item/admins-item.component";
import {ButtonModule} from "primeng/button";
import {GetAdminComponent} from "./get-admin/get-admin.component";
import {UpdateAdminComponent} from "./update-admin/update-admin.component";
import {MessagesModule} from "primeng/messages";

import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from "primeng/confirmdialog";

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
        MessagesModule,
        TableModule,
        ConfirmDialogModule,
    ],
    declarations: [
        AdminComponent,
        AddAdminComponent,
        AdminsItemComponent,
        GetAdminComponent,
        UpdateAdminComponent,
    ],
})
export class AdminModule {
}
