import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import {IMembers} from "../../models/IMembers";
import {MembersService} from "../services/members.service";
import {IMemberResponse} from "../../models/IMemberResponse";
import { ToastService } from "../services/toast.service";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css'],
    providers: [MessageService, ConfirmationService, ToastService, DatePipe],
})
export class MembersComponent implements OnInit {
    members: IMembers[];
    member: IMembers;

    addForm: FormGroup;
    editForm: FormGroup;

    addDialog: boolean;
    editDialog: boolean;

    loading: boolean;
    image: any;


    egyptianPhoneRegex = /^01[0125][0-9]{8}$/;

    constructor(
        private membersService: MembersService,
        private messageService: MessageService,
        public confirmationService: ConfirmationService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private datePipe: DatePipe
    ) {
        this.members = [];
        this.member = {} as IMembers;
        this.addDialog = false;
        this.editDialog = false;
        this.loading = false;

        this.addForm = new FormGroup({
            full_name: new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-zA-Z]*$"),]),
            email: new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
            ]),
        });

        this.editForm = new FormGroup({
            _id: new FormControl("", [Validators.required]),
            full_name: new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-zA-Z]*$"),]),
            email: new FormControl("", [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
            ]),
            image: new FormControl(null),
            phone_number: new FormControl("",[
                Validators.required,
                Validators.pattern(this.egyptianPhoneRegex)
            ]),
            birth_date: new FormControl("", [
                Validators.required,
                (value) => {
                    const date = new Date(value.value).getDate();
                    const maxBirthDate = new Date('2009-01-01 00:00:00').getDate();
                    return date < maxBirthDate ? null : { invalidDate: true };
                },
            ]),
            address: new FormGroup({
                city: new FormControl("", [
                    Validators.required,
                    Validators.pattern("^[a-zA-Z]*$"),]),
                street: new FormControl("", [
                    Validators.required,
                    Validators.pattern("^[a-zA-Z]*$"),]),
                building: new FormControl("", [
                    Validators.required,
                    Validators.pattern("^[0-9]*$"),]),
            })
        })
    }

    ngOnInit() {
        this.loadMembers();
    }


    showAddDialog() {
        this.member = {} as IMembers;
        this.addForm.reset();
        this.addDialog = true;
    }

    cancelAddDialog() {
        this.addDialog = false;
    }

    Add() {
        this.member = this.addForm.value;

        Object.keys(this.member).forEach((key) => {
            // @ts-ignore
            if (this.member[key] === "") {
                // @ts-ignore
                delete this.member[key];
            }
        });

        this.membersService.addMember(this.member).subscribe(
            (data: IMemberResponse) => {
                this.loadMembers();
                this.toastService.showSuccess("Member Added Successfully");
                this.addDialog = false;
            },
            (error) => {
                let keys = Object.keys(error.message);
                for (let key of keys) {
                    this.toastService.showError(error.message[key]);
                }
            }
        );
    }


    confirmDelete(member: IMembers) {
        this.member = member;
        this.confirmationService.confirm({
            message:
                "Are you sure that you want to delete " +
                member.full_name +
                " ?",
            header: "Delete Confirmation",
            accept: () => {
                this.deleteConfirmed();
            },
        });
    }

    deleteConfirmed() {
        this.delete();
        this.confirmationService.close();
        this.loadMembers();
    }

    delete() {
        this.membersService.deleteMemberById(this.member._id).subscribe(
            (data) => {
                this.toastService.showSuccess("Member Deleted Successfully");
                this.loadMembers();
            },
            (error) => {
                this.toastService.showError("Member Not Deleted");
            }
        );
    }

    showEditDialog(member: IMembers) {
        if(member.activated){
            // @ts-ignore
            member.birth_date = this.datePipe.transform(member.birth_date, "yyyy-MM-dd");
            this.editForm.patchValue(member);
            this.editForm.patchValue({ image: member.image });
            this.editDialog = true;
        } else {
            this.editDialog = false;
            this.toastService.showError("Member Not Activated");
        }
    }


    cancelEditDialog() {
        this.editDialog = false;
    }

    onFileChange(event: Event) {

        const reader = new FileReader();
        // @ts-ignore
        if (event.target.files && event.target.files.length) {
            // @ts-ignore
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.image = reader.result as string;
                this.editForm.patchValue({
                    image: reader.result,
                });
            };
        }
    }

    update() {
        this.member = this.editForm.value;
        Object.keys(this.member).forEach((key) => {
            // @ts-ignore
            if (this.member[key] === "" || this.member[key] === null) {
                // @ts-ignore
                delete this.member[key];
            }
        });
        this.membersService.updateMember(this.member).subscribe(
            (data) => {
                this.toastService.showSuccess("Member Updated Successfully");
                this.editDialog = false;
                this.loadMembers();
            },
            (error) => {
                let keys = Object.keys(error.message);
                for (let key of keys) {
                    this.toastService.showError(error.message[key]);
                }
            }
        );
    }

    private loadMembers() {
        this.loading = true;
        this.membersService.getMembers().subscribe(
            (data) => {
                this.members = data.data;
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                this.toastService.showError("Error Loading Members");
            }
        );
    }
}