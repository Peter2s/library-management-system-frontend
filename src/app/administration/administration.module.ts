import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Component } from '../shared/Error404/Error404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdministrationMainLayoutComponent } from './components/administrationMainLayout/administrationMainLayout.component';
import { AuthModule } from './components/auth/auth.module';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { AdminRoutingModule } from './administration-routing.module';
import { EmployeesModule } from './employees/employees.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    Error404Component,
    DashboardComponent,
    AdministrationMainLayoutComponent,
  ],
})
export class administrationModule {}
