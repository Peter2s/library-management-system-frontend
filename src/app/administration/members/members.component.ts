import {Component, OnInit} from '@angular/core';
import {IMembers} from "../../models/IMembers";
import {MembersService} from "../services/members.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IMembersResponse} from "../../models/IMembersResponse";
import {IMemberResponse} from "../../models/IMemberResponse";
import {IUpdateMessage} from "../../models/IUpdateMessage";

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
    providers: [ConfirmationService, MessageService]
})
export class MembersComponent implements OnInit {
    memberForm: FormGroup = {} as FormGroup;
    members: IMembers[];
    member: IMembers;
    maxBirthDate = new Date('2009-01-01 00:00:00').getDate();
    egyptianPhoneRegex = /^01[0125][0-9]{8}$/;
    editMemberFlag: boolean = false;
    displayDialog: boolean;
    loading: boolean;

    public validationErros?: { [p: string]: string };
    protected readonly console = console;

    constructor(
        private membersService: MembersService,
        public confirmationService: ConfirmationService,
        public messageService: MessageService,
        private formBuilder: FormBuilder
    ) {
        this.members = [];
        this.member = {} as IMembers;
        this.displayDialog = false;
        this.loading = false;
    }

    ngOnInit() {
        const trim = (str: string) => str.trim();
        this.loadMembers();
        this.memberForm = this.formBuilder.group({
            full_name: [trim, Validators.required, Validators.minLength(3)],
            email: ['', Validators.required, Validators.email],
            password: ['', Validators.required, Validators.minLength(8)],
            image: ['', Validators.required],
            phone_number: ['', Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(this.egyptianPhoneRegex)],
            birth_date: ['', Validators.required, Validators.max(this.maxBirthDate)],
            address: {
                city: ['', Validators.required],
                street: ['', Validators.required],
                building: ['', Validators.required],
            },
        });
        this.loadMembers();
    }


    showDialogToAdd() {
        this.member = {} as IMembers;
        this.displayDialog = true
    }

    deleteConfirmed() {
        this.deleteMember();
        this.confirmationService.close();
        this.loadMembers();
    }

    confirmDeleteMember(member: IMembers) {
        this.member = member;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this Member?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'No',
            accept: () => {
                this.deleteConfirmed();
            },
        });
    }

    saveMember() {
        this.validationErros = {};
        if (this.member._id) {
            this.membersService.updateMember(this.member).subscribe(
                (response: IUpdateMessage) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Member updated.',
                        life: 5000
                    });
                    this.displayDialog = false;
                    this.editMemberFlag = false;
                    this.loadMembers();
                },
                (error) => {
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
            this.membersService.addMember(this.member).subscribe(
                (response: IMemberResponse) => {
                    this.members.push(response.data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Member added.',
                        life: 5000
                    });
                    this.displayDialog = false;
                },
                (error) => {
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
                })
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

    cancel() {
        this.displayDialog = false;
    }

    deleteMember() {
        this.displayDialog = false;
        if (this.member._id) {
            this.membersService.deleteMemberById(this.member._id).subscribe(
                () => {
                    this.members.splice(this.findIndexById(this.member._id), 1);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Member deleted.',
                        life: 5000
                    });
                    this.loadMembers();
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete Member.',
                        life: 5000
                    });
                }
            );
        }
    }

    editMember(member: IMembers): void {
        if (member.activated) {
            this.member = {...member};
            this.displayDialog = true;
            this.editMemberFlag = true;
        } else {
            this.messageService.add({
                key: 'ativationError',
                severity: 'warn',
                summary: 'Warning',
                detail: 'Member Is Not Activated',
                life: 5000, // message will be visible for 5 seconds
                closable: true, // user can close the message
                sticky: false // message will not stay visible until closed
            });
        }
    }

    private loadMembers() {
        this.loading = true;
        this.membersService.getMembers().subscribe(
            (response: IMembersResponse) => {
                this.members = response.data;
                this.loading = false;
            }, (error) => {
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to get Members.'
                    });
                this.loading = false;
            }
        )
    }

    private findIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.members.length; i++) {
            if (this.members[i]._id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}
