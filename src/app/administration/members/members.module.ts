import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MembersComponent } from './members.component';
import {MembersRoute} from "./members.routing";
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import { MembersItemComponent } from './members-item/members-item.component';

@NgModule({
    imports: [
        CommonModule,
        MembersRoute,
        PaginatorModule,
        SkeletonModule,
        NgOptimizedImage
    ],
  declarations: [MembersComponent, MembersItemComponent]
})
export class MembersModule { }
