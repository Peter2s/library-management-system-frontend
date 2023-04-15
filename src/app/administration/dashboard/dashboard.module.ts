import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { DashboardRoutes } from './dashboard.routing';
import {TableModule} from "primeng/table";

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutes,
        TableModule
    ],
  declarations: [ReportComponent],
  
  
})
export class DashboardModule { }
