import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoadingInterceptor} from "./shared/services/LoadingInterceptor";
import {AuthInterceptor} from "./shared/services/authInterceptor.service";
import {AllBooksComponent} from './administration/books/all-books/all-books.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PaginatorModule} from "primeng/paginator";
import {FileUploadModule} from "primeng/fileupload";
import {LatestComponent} from './books/latest/latest.component';
import { MostBorrowedComponent } from './books/most-borrowed/most-borrowed.component';
import { MostReadingComponent } from './books/most-reading/most-reading.component';
import {MemberActivationComponent} from "./member-activation/member-activation.component";
import {MemberLoginComponent} from "./member-login/member-login.component";
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
    declarations: [AppComponent, AllBooksComponent, LatestComponent, MostBorrowedComponent, MostReadingComponent,MemberActivationComponent,MemberLoginComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        InputNumberModule,
        MessagesModule,
        MessageModule,
        ConfirmDialogModule,
        PaginatorModule,
        FileUploadModule,
        ReactiveFormsModule,
        ToastModule,
        ProgressSpinnerModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
