import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MembersComponent } from './members.component';
import {MembersRoute} from "./members.routing";
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import { MembersItemComponent } from './members-item/members-item.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberAddComponent } from './member-add/member-add.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {SelectButtonModule} from "primeng/selectbutton";
import {CardModule} from "primeng/card";
import { MemberDeleteComponent } from './member-delete/member-delete.component';

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

    ],
  declarations: [MembersComponent, MembersItemComponent, MemberDetailsComponent, MemberAddComponent, MemberDeleteComponent]
})
export class MembersModule { }
