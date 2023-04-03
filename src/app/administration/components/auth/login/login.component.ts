import { Component, OnInit } from "@angular/core";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";

import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import {} from "@angular/forms";
import { async } from '@angular/core/testing';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
  faBookOpenReader = faBookOpenReader;
  loginForm = this.fb.group({
    email: ["", [Validators.required,Validators.email]],
    password: ["", [Validators.required,Validators.minLength(8)] ],
  });

  constructor(private AuthService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {}
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
  onSubmit() {
    //console.log(this.email.value, this.password.value);
  }
}
