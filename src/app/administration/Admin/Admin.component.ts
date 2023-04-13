import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AdminsService} from "../services/admins.service";
import {IManagers} from "../../models/IManagers";
import {IManagerResponse} from "../../models/IManagerResponse";

@Component({
    selector: "app-Admin",
    templateUrl: "./Admin.component.html",
    styleUrls: ["./Admin.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class AdminComponent implements OnInit {
    admins: IManagers[];
    adminAddForm: FormGroup;
    adminEditForm: FormGroup;
    admin: IManagers;
    displayDialog: boolean;
    currentPage: number = 1;
    adminsPerPage: number = 4;
    rowsPerPageOptions: number[] = [8, 2 * 8, 4 * 8];
    totalAdminsCount: number = 0;
    first: number = 0;
    loading: boolean;
    public validationErros?: { [p: string]: string };
    protected readonly console = console;

    constructor(
        private adminsService: AdminsService,
        private messageService: MessageService,
        public confirmationService: ConfirmationService,
        private formBuilder: FormBuilder
    ) {
        this.admins = [];
        this.admin = {} as IManagers;
        this.displayDialog = false;
        this.loading = false;
    }

    ngOnInit() {
        const trim = (str: string) => str.trim();
        this.getAllAdmins();
    }

    onPageChange(event: any) {
        this.currentPage = event.page + 1;
        this.adminsPerPage = event.rows;
        this.getAllAdmins();
        this.adminAddForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", Validators.compose([
                Validators.required,
                Validators.email,
                value => {
                    const email = value.value;
                    return email && email.trim() ? null : {invalidEmail: true};
                }
            ])],
            hireDate: ["", Validators.compose([
                Validators.required,
                value => {
                    const date = new Date(value.value);
                    const today = new Date();
                    return date < today ? null : {invalidDate: true};
                }
            ])],
            salary: ["", Validators.required],
            activated: [false],
        })
        this.adminEditForm = this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email: ["", Validators.compose([
                Validators.required,
                Validators.email,
                value => {
                    const email = value.value;
                    return email && email.trim() ? null : {invalidEmail: true};
                }
            ])],
            birthDate: ["", Validators.compose([
                Validators.required,
                value => {
                    const date = new Date(value.value);
                    const today = new Date();
                    return date < today ? null : {invalidDate: true};
                }
            ])],
            password: ["", Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20),
                value => {
                    const password = value.value;
                    return password && password.trim() ? null : {invalidPassword: true};
                }
            ])],
            salary: ["", Validators.compose([
                Validators.required,
                value => {
                    const salary = value.value;
                    return salary > 2500 ? null : {invalidSalary: true};
                }
            ])],
            role: ["", Validators.compose([
                Validators.required,
                //     Value is one of [admin,super-admin,employee]
                value => {
                    const role = value.value;
                    const roles = ["admin", "super-admin", "employee"];
                    return roles.includes(role) ? null : {invalidRole: true};
                }
            ])],
            image: ["", Validators.compose([
                // Validators.required,
                value => {
                    const image = value.value;
                    const mimes = ["image/jpeg", "image/png", "image/gif"];
                    return mimes.includes(image.type) ? null : {invalidImage: true};
                }
            ])],
        })
    }

    // Show Dialog
    showDialogToAdd() {
        this.admin = {} as IManagers;
        this.displayDialog = true;
    }

    // Save Admin
    saveAdmin() {
        this.validationErros = {};
        //   Id Exists => Edit Admin
        if (this.admin._id) {
            this.adminsService.updateAdminById(this.admin._id, this.admin).subscribe(
                (data) => {
                    this.admin = data;
                    this.messageService.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Admin Updated Successfully",
                        life: 3000
                    });
                    this.getAllAdmins();
                    this.displayDialog = false;
                },
                (error) => {
                    this.validationErros = this.formatError(error.message);
                    let keys = Object.keys(this.validationErros);
                    for (let key of keys) {
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: this.validationErros[key],
                            life: 3000
                        });
                    }
                }
            )
        } else {//   Id Not Exists => Add new Admin
            this.adminsService.addAdmin(this.admin).subscribe(
                (data: IManagerResponse) => {
                    this.admins.push(data.data);
                    this.messageService.add({
                        severity: "success",
                        summary: "Success",
                        detail: "Admin Added Successfully",
                        life: 3000
                    })
                    this.displayDialog = false;
                },
                (error) => {
                    this.validationErros = this.formatError(error.message);
                    let keys = Object.keys(this.validationErros);
                    for (let key of keys) {
                        this.messageService.add({
                            severity: "error",
                            summary: "Error",
                            detail: this.validationErros[key],
                            life: 3000
                        });
                    }

                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: error.message,
                        // life: 3000
                    })
                }
            );

        }
        this.getAllAdmins();
    }

    // Edit Admin
    editAdmin(admin: IManagers) {
        this.admin = {...admin};
        this.displayDialog = true;

    }

    // Confirm Delete Admin
    confirmDeleteAdmin(admin: IManagers) {
        this.admin = admin;
        this.confirmationService.confirm({
            message: "Are you sure that you want to delete this Admin?",
            header: "Delete Confirmation",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            accept: () => {
                this.deleteConfirmed();
            },
        });
    }

    // Delete Confirmed
    deleteConfirmed() {
        console.log("this.admin");
        this.deleteAdmin()
        this.confirmationService.close();
        this.getAllAdmins()
    }

    // Delete Admin
    deleteAdmin() {
        this.adminsService.deleteAdminById(this.admin._id).subscribe(
            (data) => {
                this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Admin Deleted Successfully",
                    life: 3000
                });
            },
            (error) => {
                this.messageService.add({
                    severity: "error",
                    summary: "Error",
                    detail: "Admin Not Deleted",
                    life: 3000
                });
            }
        );
    }

    // Cancel Dialog
    cancelDialog() {
        this.displayDialog = false;
    }


    // Format Error
    formatError(error: string): { [key: string]: string } {
        const errors: { [key: string]: string } = {};
        error = error.replace("Error: ", "");
        error.split(",").forEach((error) => {
            let [key, ...value] = error.split(":");
            key = key.substring(key.indexOf("[") + 1, key.indexOf("]"))
            errors[key.trim()] = value.join(":").split("==>")[1].trim();
        });
        return errors;
    }

    private getAllAdmins() {
        this.loading = true;
        this.adminsService
            .getAdmins(this.currentPage, this.adminsPerPage)
            .subscribe((data) => {
                    this.admins = data.data;
                    this.totalAdminsCount = data.pagination?.total_managers_count;
                    this.loading = false;
                },
                (error) => {
                    this.loading = false;
                    this.messageService.add({
                        severity: "error",
                        summary: "Error",
                        detail: "Something went wrong",
                    }); // End of messageService.add
                }
            );
    }

    // End of class
}
