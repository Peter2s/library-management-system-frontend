import {Component} from "@angular/core";
import {faBookOpenReader} from "@fortawesome/free-solid-svg-icons";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {} from "@angular/forms";
import {Router} from "@angular/router";
import {IAuthResponse} from "src/app/models/IAuthResponse";
import {ToastService} from "../../../services/toast.service";
import {MessageService} from "primeng/api";
import {PartialObserver} from "rxjs";
import {IActivationAdministration} from "../../../../models/IActivationAdministration";

@Component({
  selector: "app-activation",
  templateUrl: "./activation.component.html",
  styleUrls: ["./activation.component.css"],
  providers: [MessageService, ToastService],
})

export class ActivationComponent {
  faBookOpenReader = faBookOpenReader;
  activeForm: FormGroup;
  serverError: any = null;
  private subscription: any;

  constructor(
      private AuthService: AuthService,
      private router: Router,
      private messageService: MessageService,
      private toastService: ToastService
  ) {
    this.activeForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      newpassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      birthDate: new FormControl("", [
        Validators.required,
        (value) => {
          const date = new Date(value.value);
          const today = new Date();
          return date < today ? null : { invalidDate: true };
        },
      ]),
    });
  }

  onSubmit() {
    let LoginCredentials: IActivationAdministration = {
      'email': this.activeForm.controls['email'].value,
      'password': this.activeForm.controls['password'].value,
      'newpassword': this.activeForm.controls['newpassword'].value,
      'birthDate': this.activeForm.controls['birthDate'].value,
    };
    let loginObserver: PartialObserver<IAuthResponse> = {
      next: (result) => {
        this.AuthService.storeTokens(result);
        this.toastService.showSuccess("Account activated successfully");
        this.router.navigate(["/admin/login"]);
      },
      error: (error) => {
        if (error.status === 500) {
            this.toastService.showError("This Account is activated");
        }else{
          if(typeof error.message === 'string') {
            this.toastService.showError(error.message);
          }else{
            let keys = Object.keys(error.message);
            for (let key of keys) {
              this.toastService.showError(error.message[key]);
            }
          }
        }
      },
    };
    const sub = this.AuthService.activationAdministration(LoginCredentials).subscribe(loginObserver);
    this.subscription.push(sub);
  }

}
