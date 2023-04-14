import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MembersComponent} from './members.component';
import { ListReadingComponent } from './books/list-reading/list-reading.component';
import { ListBorrowedComponent } from './books/list-borrowed/list-borrowed.component';
import { CurrentBorrowedComponent } from './books/current-borrowed/current-borrowed.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [MembersComponent, ListReadingComponent, ListBorrowedComponent, CurrentBorrowedComponent]
})
export class MembersModule {
}
