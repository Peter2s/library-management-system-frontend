import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', component:ReportComponent},
];

export const DashboardRoutes = RouterModule.forChild(routes);
