import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MembersComponent} from './members.component';
import {MembersRoute} from "./members.routing";
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import {MemberDetailsComponent} from './member-details/member-details.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {SelectButtonModule} from "primeng/selectbutton";
import {CardModule} from "primeng/card";
import {MessagesModule} from "primeng/messages";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
    imports: [
        CommonModule,
        MembersRoute,
        PaginatorModule,
        SkeletonModule,
        NgOptimizedImage,
        ProgressSpinnerModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        SelectButtonModule,
        CardModule,
        MessagesModule,
        ConfirmDialogModule,
        DialogModule,
        InputTextModule,

    ],
    declarations: [MembersComponent, MemberDetailsComponent]
})
export class MembersModule {
}
