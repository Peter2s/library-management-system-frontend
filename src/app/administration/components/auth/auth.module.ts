import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivationComponent } from './activation/activation.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";
import { MessagesModule } from 'primeng/messages';
import {InputTextModule} from "primeng/inputtext";



@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        MessagesModule,
        InputTextModule,
    ],
  declarations: [ActivationComponent, LoginComponent],
  providers: [MessageService],
})
export class AuthModule {}
