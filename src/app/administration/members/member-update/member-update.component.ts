import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MembersService} from "../../services/members.service";
import {FormService} from "../../../shared/services/Form.service";
import {LoadingService} from "../../../shared/services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IMembers} from "../../../models/IMembers";

@Component({
    selector: 'app-member-update',
    templateUrl: './member-update.component.html',
    styleUrls: ['./member-update.component.css']
})
export class MemberUpdateComponent {
    updateMember: FormGroup;
    member: IMembers | undefined

    constructor(private fb: FormBuilder,
                private membersService: MembersService,
                private formService: FormService,
                public loadingService: LoadingService,
                private router: Router,
                private route: ActivatedRoute
    ) {
        this.updateMember = this.fb.group({
            full_name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            image: ['', Validators.required],
            phone_number: ['', Validators.required],
            birth_date: ['', Validators.required],
            address: this.fb.group({
                city: ['', Validators.required],
                street: ['', Validators.required],
                building: ['', Validators.required],
            }),
        })
    }


    get full_name() {
        return this.updateMember.get('full_name');
    }

    get email() {
        return this.updateMember.get('email');
    }

    get password() {
        return this.updateMember.get('password');
    }

    get image() {
        return this.updateMember.get('image');
    }

    get phone_number() {
        return this.updateMember.get('phone_number');
    }

    get birth_date() {
        return this.updateMember.get('birth_date');
    }

    get city() {
        return this.updateMember.get('address.city');
    }

    get street() {
        return this.updateMember.get('address.street');
    }

    get building() {
        return this.updateMember.get('address.building');
    }


    ngOnInit() {
        const id: string | null = this.route.snapshot.paramMap.get('id');
        this.membersService.getMemberById(id).subscribe(member => {
            this.member = member.data
            this.updateMember.patchValue(this.member);
        });
    }


    onSubmit() {
        //   if (this.updateMember.valid) {
        //     this.membersService.updateMember(this.member?._id,this.updateMember.value).subscribe((message) => {
        //       this.router.navigateByUrl('admin/members');
        //     });
        //   } else {
        //     this.formService.handelError(this.updateMember);
        //   }
        // }
    }
}
