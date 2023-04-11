import { Component } from "@angular/core";
import { IManagers } from "../../../models/IManagers";
import { AdminsService } from "../../services/admins.service";
import { LoadingService } from "../../../shared/services/loading.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: "app-get-admin",
  templateUrl: "./get-admin.component.html",
  styleUrls: ["./get-admin.component.css"],
})
export class GetAdminComponent {
  admin: IManagers | undefined;
  fullName: string = "";
  subscription: Subscription[] = [];
  constructor(
    private adminsService: AdminsService,
    public loadingService: LoadingService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    const url = `/admin/${id}`;
    const sub = this.adminsService.getAdminById(url).subscribe((data) => {
      this.admin = data.data;
      // Full Name
      this.fullName =
        `${this?.admin.firstName[0]}.${this.admin?.lastName}` || "";
      console.log(this.admin.birthDate);
      this.subscription.push(sub);
    });
  }

  deleteAdmin(id: any) {
    this.adminsService.deleteAdminById(id).subscribe(
      (msg) => {
        this.router.navigateByUrl("admin/admins");
      },
      () => {
        this.router.navigateByUrl("admin/admins");
      }
    );
  }
}
