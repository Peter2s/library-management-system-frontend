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
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AuthModule,
    BooksModule,
    MembersModule,
    EmployeesModule,
    
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    Error404Component,
    DashboardComponent,
    AdministrationMainLayoutComponent,
  ]
})
export class administrationModule {}