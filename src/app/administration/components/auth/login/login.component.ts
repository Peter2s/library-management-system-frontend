import { Component, OnDestroy, OnInit } from "@angular/core";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import {} from "@angular/forms";
import { async } from "@angular/core/testing";
import { ILogin } from "../../../../models/ILogin";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  // loginForm: FormGroup;
  faBookOpenReader = faBookOpenReader;
  loginForm: any;
  serverError: any =null;
  subscription: Subscription[] = [];

  constructor(private AuthService: AuthService, private fb: FormBuilder) {}

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
      if (this.loginForm.valid) {
        const sub = this.AuthService.login(LoginCredentials).subscribe({
          next: (result) => {
            console.log(result);
            localStorage.setItem("accessToken", result.accessToken);
            localStorage.setItem("refreshToken", result.refreshToken);
             this.subscription.push(sub);
          },
          error:(err)=> {
            this.serverError = err;
          },
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
