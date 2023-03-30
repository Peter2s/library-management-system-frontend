import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Component } from '../shared/Error404/Error404.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdministrationMainLayoutComponent } from './components/administrationMainLayout/administrationMainLayout.component';
import { AuthModule } from './components/auth/auth.module';
import { BooksComponent } from './components/books/books.component';

@NgModule({
  imports: [CommonModule, RouterModule,AuthModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    Error404Component,
    DashboardComponent,
    AdministrationMainLayoutComponent,
    BooksComponent
  ],
})
export class administrationModule {}
