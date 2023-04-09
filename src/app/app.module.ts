import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LoadingInterceptor } from "./shared/services/LoadingInterceptor";
import { AuthInterceptor } from "./shared/services/authInterceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
