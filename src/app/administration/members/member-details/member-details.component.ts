import {Component, Input} from '@angular/core';
import {IMembers} from "../../../models/IMembers";
import {MembersService} from "../../services/members.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent {
  member: IMembers | undefined;
  constructor(
      private route: ActivatedRoute,
      private membersService: MembersService,
      private apiService: ApiService
  ) {
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.membersService.getMemberById(id).subscribe(member => {
      this.member = member.data;
    });
  }

}
