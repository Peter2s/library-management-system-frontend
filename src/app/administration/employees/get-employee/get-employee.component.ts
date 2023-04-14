import { Component } from "@angular/core";
import { IManagers } from "../../../models/IManagers";
import { LoadingService } from "../../../shared/services/loading.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { EmployeesService } from "../../services/employees.service";
@Component({
  selector: "app-get-employee",
  templateUrl: "./get-employee.component.html",
  styleUrls: ["./get-employee.component.css"],
})
export class GetEmployeeComponent {
  employee: IManagers | undefined;
  fullName: string = "";
  subscription: Subscription[] = [];
  constructor(
    public loadingService: LoadingService,
    public route: ActivatedRoute,
    public router: Router,
    private employeesService: EmployeesService
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    const url = `/employee/${id}`;
    const sub = this.employeesService.getEmployeeById(url).subscribe((data) => {
      this.employee = data.data;
      this.fullName =
        `${this?.employee.firstName[0]}.${this.employee?.lastName}` || "";
      this.subscription.push(sub);
    });
  }
}
