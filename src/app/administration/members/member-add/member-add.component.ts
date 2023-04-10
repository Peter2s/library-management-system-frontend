import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../shared/services/Form.service";
import {LoadingService} from "../../../shared/services/loading.service";
import {Router} from "@angular/router";
import {MembersService} from "../../services/members.service";

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.css']
})
export class MemberAddComponent {
  addMember: FormGroup;

  constructor(
      private fb: FormBuilder,
      private membersService: MembersService,
      private formService: FormService,
      public loadingService:LoadingService,
      private router: Router
  ) {
    this.addMember = this.fb.group({
      full_name: ['',Validators.required],
      email: ['',Validators.required],
      password: ['', Validators.required],
      activated: [false]
    })
  }

  get full_name(){
    return this.addMember.get('full_name');
  }

  get email(){
    return this.addMember.get('email');
  }

  get password(){
    return this.addMember.get('password');
  }

  get activated(){
    return this.addMember.get('activated');
  }

  ngOnInit(){ }

  onSubmit(){
    if (this.addMember.valid) {
      this.membersService.addMember(this.addMember.value).subscribe((book) => {
        this.router.navigateByUrl('admin/members');
      });
    } else {
      this.formService.handelError(this.addMember);
    }
  }
}
