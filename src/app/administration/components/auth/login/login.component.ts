import { Component, OnDestroy, OnInit } from "@angular/core";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import {} from "@angular/forms";
import { ILogin } from "../../../../models/ILogin";
import { Observer, PartialObserver, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { IAuthResponse } from "src/app/models/IAuthResponse";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  // loginForm: FormGroup;
  faBookOpenReader = faBookOpenReader;
  loginForm: any;
  serverError: any = null;
  subscription: Subscription[] = [];

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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
        },
      };
      if (this.loginForm.valid) {
        const sub =this.AuthService.login(LoginCredentials).subscribe(loginObserver);
        this.subscription.push(sub);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
