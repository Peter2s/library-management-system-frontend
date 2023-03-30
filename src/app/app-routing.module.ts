import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/Error404/Error404.component';
import { LoginComponent } from './administration/components/auth/login/login.component';
import { DashboardComponent } from './administration/components/dashboard/dashboard.component';
import { AdministrationMainLayoutComponent } from './administration/components/administrationMainLayout/administrationMainLayout.component';
import { ActivationComponent } from './administration/components/auth/activation/activation.component';
import { BooksComponent } from './administration/components/books/books.component';

const routes: Routes = [
  {
    path: "admin",
    component: AdministrationMainLayoutComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "books", component: BooksComponent },
    ],
  },

  { path: "admin/activation", component: ActivationComponent },
  { path: "admin/login", component: LoginComponent },

  { path: "**", component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
