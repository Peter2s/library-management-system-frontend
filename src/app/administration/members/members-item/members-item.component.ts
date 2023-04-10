import {Component, Input} from '@angular/core';
import {IMembers} from "../../../models/IMembers";

@Component({
  selector: 'app-members-item',
  templateUrl: './members-item.component.html',
  styleUrls: ['./members-item.component.css']
})
export class MembersItemComponent {
  @Input() memberItem!: IMembers;
}
