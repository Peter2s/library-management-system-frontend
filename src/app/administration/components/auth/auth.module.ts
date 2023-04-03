import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivationComponent } from './activation/activation.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, FormsModule,ReactiveFormsModule],
  declarations: [ActivationComponent, LoginComponent],
})
export class AuthModule {}
