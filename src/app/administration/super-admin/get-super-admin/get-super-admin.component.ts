import { Component } from "@angular/core";
import { IManagers } from "../../../models/IManagers";
import { LoadingService } from "../../../shared/services/loading.service";
import { SuperSuperAdminService } from "../../services/super-admin.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: "app-get-super-admin",
  templateUrl: "./get-super-admin.component.html",
  styleUrls: ["./get-super-admin.component.css"],
})
export class GetSuperAdminComponent {
  superAdmin: IManagers | undefined;
  fullName: string = "";
  subscription: Subscription[] = [];
  constructor(
    private superAdminsService: SuperSuperAdminService,
    public loadingService: LoadingService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    const url = `/superAdmin/${id}`;
    const sub = this.superAdminsService
      .getSuperAdminById(url)
      .subscribe((data) => {
        this.superAdmin = data.data;
        this.fullName =
          `${this?.superAdmin.firstName[0]}.${this.superAdmin?.lastName}` || "";
        this.subscription.push(sub);
      });
  }
}
