import {Component} from "@angular/core";
import {faBookOpenReader} from "@fortawesome/free-solid-svg-icons";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {} from "@angular/forms";
import {ILogin} from "../../../../models/ILogin";
import {Router} from "@angular/router";
import {IAuthResponse} from "src/app/models/IAuthResponse";
import {ToastService} from "../../../services/toast.service";
import {MessageService} from "primeng/api";
import {PartialObserver} from "rxjs";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    providers: [MessageService, ToastService],
})
export class LoginComponent {
    faBookOpenReader = faBookOpenReader;
    loginForm: FormGroup;
    serverError: any = null;
    private subscription: any;

    constructor(
        private AuthService: AuthService,
        private router: Router,
        private messageService: MessageService,
        private toastService: ToastService
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
            ]),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20),
            ]),
        });
    }

    onSubmit() {
        let LoginCredentials: ILogin = { 'email': this.loginForm.controls['email'].value, 'password': this.loginForm.controls['password'].value};
        let loginObserver: PartialObserver<IAuthResponse> = {
            next: (result) => {
                this.AuthService.storeTokens(result);
                this.router.navigate(["/admin/admins"]);
            },
            error: (error) => {
                if(typeof error.message === 'string') {
                    this.toastService.showError(error.message);
                    this.router.navigate(["/admin/activation"])
                }else{
                    let keys = Object.keys(error.message);
                    for (let key of keys) {
                        this.toastService.showError(error.message[key]);
                    }
                }
            },
        };
        const sub = this.AuthService.login(LoginCredentials).subscribe(loginObserver);
        this.subscription.push(sub);
    }

}
