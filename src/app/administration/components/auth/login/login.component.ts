import { Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import {} from "@angular/forms";
import { ILogin } from "../../../../models/ILogin";
import {  PartialObserver, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { IAuthResponse } from "src/app/models/IAuthResponse";
import { Message, MessageService } from "primeng/api";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {
  // loginForm: FormGroup;
  faBookOpenReader = faBookOpenReader;
  loginForm: any;
  serverError: any = null;
  validationErrors: Message[] = [];
  subscription: Subscription[] = [];
  @ViewChild('passwordInput') passwordInput:ElementRef | null = null;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }



  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }



  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onSubmit() {
    let email = this.email?.value;
    let password = this.password?.value;

    if (email && password) {
      let LoginCredentials: ILogin = { email, password };

      let loginObserver: PartialObserver<IAuthResponse> = {
        next: (result) => {
          console.log(result);
          this.AuthService.storeTokens(result);
          this.router.navigate(["/admin/dashboard"]);
        },
        error: (err) => {
          this.serverError = err;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message,
            life: 5000,
          });
        },
      };
      if (this.loginForm.valid) {
        const sub =
          this.AuthService.login(LoginCredentials).subscribe(loginObserver);
        this.subscription.push(sub);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
