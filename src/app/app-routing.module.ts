import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/Error404/Error404.component';
import { LoginComponent } from './administration/components/auth/login/login.component';
import { DashboardComponent } from './administration/components/dashboard/dashboard.component';
import { AdministrationMainLayoutComponent } from './administration/components/administrationMainLayout/administrationMainLayout.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdministrationMainLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `first-component`
      { path: 'dashboard', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
