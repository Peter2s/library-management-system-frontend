import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {faBookOpenReader} from "@fortawesome/free-solid-svg-icons";
import {Message, MessageService} from "primeng/api";
import {AuthService} from "../administration/services/auth.service";
import {ILogin} from "../models/ILogin";

import {PartialObserver, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {IAuthResponse} from "../models/IAuthResponse";

@Component({
    selector: 'app-member-login',
    templateUrl: './member-login.component.html',
    styleUrls: ['./member-login.component.css'],
    providers: [MessageService],

})
export class MemberLoginComponent implements OnInit {
    faBookOpenReader = faBookOpenReader;
    loginForm: any;
    serverError: any = null;
    validationErrors: Message[] = [];
    subscription: Subscription[] = [];
    @ViewChild('passwordInput') passwordInput: ElementRef | null = null;

    constructor(private AuthService: AuthService,
                private router: Router,
                private formBuilder: FormBuilder,
                private messageService: MessageService) {
    }

    get email() {
        return this.loginForm.get("email");
    }

    get password() {
        return this.loginForm.get("password");
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmit() {
        let email = this.email?.value;
        let password = this.password?.value;
        if (email && password) {
            let LoginCredentials: ILogin = {email, password};
            let loginObserver: PartialObserver<IAuthResponse> = {
                next: (result) => {
                    this.AuthService.storeTokens(result);
                    this.router.navigate(["/"]);
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
                    this.AuthService.memberLogin(LoginCredentials).subscribe(loginObserver);
                this.subscription.push(sub);
            }
        }
    }
}
