import { Component, Input } from "@angular/core";
import { IManagers } from "../../../models/IManagers";

@Component({
  selector: "app-admins-item",
  templateUrl: "./admins-item.component.html",
  styleUrls: ["./admins-item.component.css"],
})
export class AdminsItemComponent {
  @Input() adminItem!: IManagers;
}
