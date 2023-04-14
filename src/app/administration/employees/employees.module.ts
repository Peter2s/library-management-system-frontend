import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { LateComponent } from './books/late/late.component';
import { AvailableComponent } from './books/available/available.component';
import { BorrowingComponent } from './books/borrowing/borrowing.component';
import { ReadingComponent } from './books/reading/reading.component';


@NgModule({
  declarations: [
    LateComponent,
    AvailableComponent,
    BorrowingComponent,
    ReadingComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
