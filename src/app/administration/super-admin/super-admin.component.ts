import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { SuperSuperAdminService } from "../services/super-admin.service";
import { IManagers } from "../../models/IManagers";
import { IManagerResponse } from "../../models/IManagerResponse";
import { ToastService } from "../services/toast.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-super-admin",
  templateUrl: "./super-admin.component.html",
  styleUrls: ["./super-admin.component.css"],
  providers: [MessageService, ConfirmationService, ToastService, DatePipe],
})
export class SuperAdminComponent {
  superAdmins: IManagers[];
  superAdmin: IManagers;
  addForm: FormGroup;
  editForm: FormGroup;
  addDialog: boolean;
  editDialog: boolean;
  loading: boolean;
  image: any;
  public validationErrors?: { [p: string]: string };
  roles: string[];

  constructor(
    private superAdminsService: SuperSuperAdminService,
    private messageService: MessageService,
    public confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private datePipe: DatePipe
  ) {
    this.superAdmins = [];
    this.superAdmin = {} as IManagers;
    this.addDialog = false;
    this.editDialog = false;
    this.loading = false;

    this.roles = ["admin", "super-admin", "employee"];
    this.addForm = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]*$"),
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]*$"),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      hireDate: new FormControl("", [
        Validators.required,
        (value) => {
          const date = new Date(value.value);
          const today = new Date();
          return date < today ? null : { invalidDate: true };
        },
      ]),
      salary: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        (value) => {
          const salary = value.value;
          return salary > 2500 ? null : { invalidSalary: true };
        },
      ]),
    });

    // @ts-ignore
    this.editForm = new FormGroup({
      // ...this.addForm.controls,
      firstName: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]*$"),
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]*$"),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      hireDate: new FormControl("", [
        Validators.required,
        (value) => {
          const date = new Date(value.value);
          const today = new Date();
          return date < today ? null : { invalidDate: true };
        },
      ]),
      salary: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        (value) => {
          const salary = value.value;
          return salary > 2500 ? null : { invalidSalary: true };
        },
      ]),
      _id: new FormControl("", [Validators.required]),
      birthDate: new FormControl("", [
        Validators.required,
        (value) => {
          const date = new Date(value.value);
          const today = new Date();
          return date < today ? null : { invalidDate: true };
        },
      ]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),

      role: new FormControl("", [
        Validators.required,
        (value) => {
          const role = value.value;
          return this.roles.includes(role) ? null : { invalidRole: true };
        },
      ]),

      image: new FormControl(null),
    });
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll() {
    this.loading = true;
    this.superAdminsService.getSuperAdmins().subscribe(
      (data) => {
        this.superAdmins = data.data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toastService.showError("Error Loading Admins");
      }
    );
  }
  showAddDialog() {
    this.superAdmin = {} as IManagers;
    this.addDialog = true;
    this.validationErrors = {};
    this.addForm.reset();
  }

  cancelAddDialog() {
    this.addDialog = false;
  }

  Add() {
    this.validationErrors = {};
    console.log(this.addForm.value);
    this.superAdmin = this.addForm.value;
    this.superAdminsService.addSuperAdmin(this.superAdmin).subscribe(
      (data: IManagerResponse) => {
        this.getAll();
        this.toastService.showSuccess("Admin Added Successfully");
        this.addDialog = false;
      },
      (error) => {
        let keys = Object.keys(error.message);
        for (let key of keys) {
          this.toastService.showError(error.message[key]);
        }
      }
    );
  }

  confirmDelete(admin: IManagers) {
    this.superAdmin = admin;
    this.confirmationService.confirm({
      message:
        "Are you sure that you want to delete " +
        admin.firstName +
        " " +
        admin.lastName +
        " ?",
      header: "Delete Confirmation",
      accept: () => {
        this.deleteConfirmed();
      },
    });
  }

  deleteConfirmed() {
    this.delete();
    this.confirmationService.close();
    this.getAll();
  }

  delete() {
    this.superAdminsService.deleteSuperAdminById(this.superAdmin._id).subscribe(
      (data) => {
        this.toastService.showSuccess("Admin Deleted Successfully");
        this.getAll();
      },
      (error) => {
        this.toastService.showError("Admin Not Deleted");
      }
    );
  }

  showEditDialog(superAdmin: IManagers) {
    // @ts-ignore
    superAdmin.birthDate = this.datePipe.transform(
      superAdmin.birthDate,
      "yyyy-MM-dd"
    );
    this.editForm.patchValue(superAdmin);
    this.editForm.patchValue({ image: superAdmin.image });
    this.editDialog = true;
  }

  cancelEditDialog() {
    this.editDialog = false;
  }

  onFileChange(event: Event) {
    const reader = new FileReader();
    // @ts-ignore
    if (event.target.files && event.target.files.length) {
      // @ts-ignore
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result as string;
        this.editForm.patchValue({
          image: reader.result,
        });
      };
    }
  }

  update() {
    this.superAdmin = this.editForm.value;
    Object.keys(this.superAdmin).forEach((key) => {
      // @ts-ignore
      if (this.superAdmin[key] === "" || this.superAdmin[key] === null) {
        // @ts-ignore
        delete this.superAdmin[key];
      }
    });
    this.superAdminsService.updateSuperAdmin(this.superAdmin).subscribe(
      (data) => {
        this.toastService.showSuccess("Admin Updated Successfully");
        this.editDialog = false;
        this.getAll();
      },
      (error) => {
        let keys = Object.keys(error.message);
        for (let key of keys) {
          this.toastService.showError(error.message[key]);
        }
      }
    );
  }
}
