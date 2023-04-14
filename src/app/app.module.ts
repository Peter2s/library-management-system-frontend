import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LoadingInterceptor} from "./shared/services/LoadingInterceptor";
import {AuthInterceptor} from "./shared/services/authInterceptor.service";
import {LangingPageComponent} from './langing-page/langing-page.component';

import {AllBooksComponent} from './_test/books/all-books/all-books.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
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
import {ButtonModule} from 'primeng/button';
import {MemberActivationComponent} from "./member-activation/member-activation.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
    declarations: [AppComponent, AllBooksComponent, MemberActivationComponent],
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
