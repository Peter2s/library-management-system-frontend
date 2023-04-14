import {Component} from "@angular/core";
import {IManagers} from "../../../models/IManagers";
import {AdminsService} from "../../services/admins.service";
import {LoadingService} from "../../../shared/services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

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
        public router: Router,
    ) {
    }

    ngOnInit() {
        this.loadingService.showLoading();
        const id = this.route.snapshot.params["id"];
        const url = `/admin/${id}`;
        const sub = this.adminsService.getAdminById(url).subscribe((data) => {
            this.admin = data.data;
            this.fullName = `${this?.admin.firstName[0]}.${this.admin?.lastName}` || "";
            this.subscription.push(sub);
            this.loadingService.hideLoading();
        });
    }

}
