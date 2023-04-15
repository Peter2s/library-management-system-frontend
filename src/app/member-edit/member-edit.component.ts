import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MembersService} from "../administration/services/members.service";
import {FormService} from "../shared/services/Form.service";
import {LoadingService} from "../shared/services/loading.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {IMembers} from "../models/IMembers";
import {DatePipe} from "@angular/common";
import {ToastService} from "../administration/services/toast.service";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
  providers: [MessageService, DatePipe, ToastService]

})
export class MemberEditComponent implements OnInit{
  editMember: FormGroup;
  egyptianPhoneRegex = /^01[0125][0-9]{8}$/;
  member: IMembers | undefined;
  constructor(
      private fb: FormBuilder,
      private membersService: MembersService,
      private formService: FormService,
      private toastService: ToastService,
      public messageService: MessageService,
      private router: Router,
      private datePipe: DatePipe
  ) {
    this.editMember = new FormGroup({
      _id: new FormControl("119", [Validators.required]),
      full_name: new FormControl("this.member.full_name", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]*$"),]),
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

  ngOnInit(): void {
    this.membersService.getMemberById('119').subscribe(member => {
      this.member = member.data;
      // @ts-ignore
      this.member.birth_date = this.datePipe.transform(this.member.birth_date, "yyyy-MM-dd");
      this.editMember.patchValue(member.data);
      this.editMember.patchValue({ image: this.member.image });

    });
  }

  onSubmit() {
    this.member = this.editMember.value;
    Object.keys(this.member).forEach((key) => {
      // @ts-ignore
      if (this.member[key] === "" || this.member[key] === null) {
        // @ts-ignore
        delete this.member[key];
      }
    });
    this.membersService.updateMember(this.member).subscribe(
        (data) => {
          this.router.navigateByUrl('home');
        },
        (error) => {
          let keys = Object.keys(error.message);
          for (let key of keys) {
            this.toastService.showError(error.message[key]);
          }
        }
    );
  }
}
