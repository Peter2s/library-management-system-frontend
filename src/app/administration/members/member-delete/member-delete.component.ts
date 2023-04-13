import {Component} from '@angular/core';
import {MembersService} from "../../services/members.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-member-delete',
    templateUrl: './member-delete.component.html',
    styleUrls: ['./member-delete.component.css']
})
export class MemberDeleteComponent {

    constructor(
        private membersService: MembersService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        // const id: number = this.route.snapshot.paramMap.get('id');
        // this.membersService.deleteMemberById(id).subscribe((message) => {
        //     this.router.navigateByUrl('admin/members');
        // }, () => {
        //     this.router.navigateByUrl('admin/members');
        // });
    }
}
