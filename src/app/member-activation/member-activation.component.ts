import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MembersService} from "../administration/services/members.service";
import {FormService} from "../shared/services/Form.service";
import {LoadingService} from "../shared/services/loading.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-member-activation',
    templateUrl: './member-activation.component.html',
    styleUrls: ['./member-activation.component.css'],
    providers: [MessageService]
})
export class MemberActivationComponent {
    activateMember: FormGroup;
    public validationErros?: { [p: string]: string };


    constructor(
        private fb: FormBuilder,
        private membersService: MembersService,
        private formService: FormService,
        public loadingService: LoadingService,
        public messageService: MessageService,
        private router: Router
    ) {
        this.activateMember = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            newpassword: ['', Validators.required],
            image: ['', Validators.required],
            phone_number: ['', Validators.required],
            birth_date: ['', Validators.required],
            address: this.fb.group({
                city: ['', Validators.required],
                street: ['', Validators.required],
                building: ['', Validators.required],
            })
        })
    }

    get email() {
        return this.activateMember.get('email');
    }

    get password() {
        return this.activateMember.get('password');
    }

    get newpassword() {
        return this.activateMember.get('newpassword');
    }

    get image() {
        return this.activateMember.get('image');
    }

    get phone_number() {
        return this.activateMember.get('phone_number');
    }

    get birth_date() {
        return this.activateMember.get('birth_date');
    }

    get city() {
        return this.activateMember.get('address.city');
    }

    get street() {
        return this.activateMember.get('address.street');
    }

    get building() {
        return this.activateMember.get('address.building');
    }

    onSubmit() {
        if (this.activateMember.valid) {
            this.membersService.activateMember(this.activateMember.value).subscribe((message) => {
                    this.router.navigateByUrl('admin/members');
                }, (error) => {
                    console.log("This", error)
                    try {
                        this.validationErros = this.formatError(error.message)
                        let keys = Object.keys(this.validationErros);
                        for (let key of keys) {
                            this.messageService.add({
                                key: key,
                                severity: 'error',
                                summary: 'Error',
                                detail: this.validationErros[key],
                            });
                        }
                    } catch (e: any) {
                    }
                    this.messageService.add({
                        key: 'MongoServerError',
                        severity: 'error',
                        summary: 'Error',
                        detail: error.message,
                    });
                }
            );
        } else {
            this.formService.handelError(this.activateMember);
        }
    }

    formatError(error: string): { [key: string]: string } {
        const errors: { [key: string]: string } = {};
        error = error.replace("Error: ", "");
        error.split(",").forEach((error) => {
            console.log("This Error", error);
            if (error) {
                let [key, ...value] = error.split(":");
                key = key.substring(key.indexOf("[") + 1, key.indexOf("]"))
                errors[key.trim()] = value.join(":").split("==>")[1].trim();
            }
        });
        return errors;
    }
}
