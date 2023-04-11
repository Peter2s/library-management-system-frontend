import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormService } from "../../../shared/services/Form.service";
import { LoadingService } from "../../../shared/services/loading.service";
import { Router } from "@angular/router";
import { AdminsService } from "../../services/admins.service";

@Component({
  selector: "app-add-admin",
  templateUrl: "./add-admin.component.html",
  styleUrls: ["./add-admin.component.css"],
})
export class AddAdminComponent {
  addAdmin: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    public loadingService: LoadingService,
    private router: Router,
    private adminService: AdminsService
  ) {
    this.addAdmin = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      hireDate: ["", Validators.required],
      salary: ["", Validators.required],
      activated: [false],
    });
  }

  get firstName() {
    return this.addAdmin.get("firstName");
  }
  get lastName() {
    return this.addAdmin.get("lastName");
  }
  get email() {
    return this.addAdmin.get("email");
  }
  get hireDate() {
    return this.addAdmin.get("hireDate");
  }
  get salary() {
    return this.addAdmin.get("salary");
  }
  get activated() {
    return this.addAdmin.get("activated");
  }

  ngOnInit() {}
  onSubmit() {
    if (this.addAdmin.valid) {
      this.adminService.addAdmin(this.addAdmin.value).subscribe((res) => {
        this.router.navigate(["/admin/admins"]);
      });
    } else {
      this.formService.handelError(this.addAdmin);
    }
  }
}
