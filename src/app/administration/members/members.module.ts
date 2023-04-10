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

@NgModule({
    imports: [
        CommonModule,
        MembersRoute,
        PaginatorModule,
        SkeletonModule,
        NgOptimizedImage,
        ProgressSpinnerModule,
        ReactiveFormsModule,

    ],
  declarations: [MembersComponent, MembersItemComponent, MemberDetailsComponent, MemberAddComponent]
})
export class MembersModule { }
