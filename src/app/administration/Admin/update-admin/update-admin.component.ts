import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IManagers } from "../../../models/IManagers";
import { AdminsService } from "../../services/admins.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingService } from "../../../shared/services/loading.service";
import { FormService } from "../../../shared/services/Form.service";

@Component({
  selector: "app-update-admin",
  templateUrl: "./update-admin.component.html",
  styleUrls: ["./update-admin.component.css"],
})
export class UpdateAdminComponent {
  updateAdmin: FormGroup;
  oldAdmin: IManagers | undefined;
  public tempName: string = "Admin";
  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private adminService: AdminsService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {
    this.updateAdmin = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      birthDate: ["", Validators.required],
      salary: ["", Validators.required],
      image: ["", Validators.required],
      role: ["", Validators.required],
    });
  }
  // Getters
  get firstName() {
    return this.updateAdmin.get("firstName");
  }
  get lastName() {
    return this.updateAdmin.get("lastName");
  }
  get email() {
    return this.updateAdmin.get("email");
  }
  get password() {
    return this.updateAdmin.get("password");
  }
  get birthDate() {
    return this.updateAdmin.get("birthDate");
  }
  get salary() {
    return this.updateAdmin.get("salary");
  }
  get image() {
    return this.updateAdmin.get("image");
  }
  get role() {
    return this.updateAdmin.get("role");
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.adminService.getAdminById(id).subscribe((res) => {
      this.oldAdmin = res.data;
      this.updateAdmin.patchValue(this.oldAdmin);
    });
  }

  onSubmit() {
    if (this.updateAdmin.valid) {
      this.adminService
        .updateAdminById(this.oldAdmin?._id, this.updateAdmin.value)
        .subscribe((res) => {
          this.router.navigateByUrl("/admin/admins");
        });
    } else {
      this.formService.handelError(this.updateAdmin);
    }
  }

  protected readonly name = name;
}
