import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { AdminsService } from "../services/admins.service";
import { IManagers } from "../../models/IManagers";
import { IManagerResponse } from "../../models/IManagerResponse";
import { ToastService } from "../services/toast.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-Admin",
  templateUrl: "./Admin.component.html",
  styleUrls: ["./Admin.component.css"],
  providers: [MessageService, ConfirmationService, ToastService, DatePipe],
})
export class AdminComponent implements OnInit {
  admins: IManagers[];
  admin: IManagers;
  addForm: FormGroup;
  editForm: FormGroup;
  addDialog: boolean;
  editDialog: boolean;
  loading: boolean;
  image: any;
  public validationErrors?: { [p: string]: string };
  roles: string[];

  constructor(
    private adminsService: AdminsService,
    private messageService: MessageService,
    public confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private datePipe: DatePipe
  ) {
    this.admins = [];
    this.admin = {} as IManagers;
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
      ...this.addForm.controls,
      _id: new FormControl("", [Validators.required]),
      birthDate: new FormControl("", [
        Validators.required,
        (value) => {
          const date = new Date(value.value);
          const today = new Date();
          return date < today ? null : { invalidDate: true };
        },
      ]),
      password: new FormControl("", [
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

  showAddDialog() {
    this.admin = {} as IManagers;
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
    this.admin = this.addForm.value;
    this.adminsService.addAdmin(this.admin).subscribe(
      (data: IManagerResponse) => {
        this.getAll();
        this.toastService.showSuccess("Admin Added Successfully");
        this.addDialog = false;
      },
      (error) => {
        this.validationErrors = this.formatError(error.message);
        let keys = Object.keys(this.validationErrors);
        for (let key of keys) {
          this.toastService.showError(this.validationErrors[key]);
        }
        this.toastService.showError(error.message);
      }
    );
  }

  confirmDelete(admin: IManagers) {
    this.admin = admin;
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
    this.adminsService.deleteAdminById(this.admin._id).subscribe(
      (data) => {
        this.toastService.showSuccess("Admin Deleted Successfully");
        this.getAll();
      },
      (error) => {
        this.toastService.showError("Admin Not Deleted");
      }
    );
  }

  formatError(error: string): { [key: string]: string } {
    const errors: { [key: string]: string } = {};
    error = error.replace("Error: ", "");
    error.split(",").forEach((error) => {
      let [key, ...value] = error.split(":");
      key = key.substring(key.indexOf("[") + 1, key.indexOf("]"));
      errors[key.trim()] = value.join(":").split("==>")[1].trim();
    });
    return errors;
  }

  showEditDialog(admin: IManagers) {
    // @ts-ignore
    // admin.hireDate = this.datePipe.transform(admin.hireDate, "yyyy-MM-dd");
    // @ts-ignore
    admin.birthDate = this.datePipe.transform(admin.birthDate, "yyyy-MM-dd");
    console.log(admin);
    this.editForm.patchValue(admin);
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
    Object.keys(this.editForm.value).forEach((key) => {
      if (this.editForm.value[key] === "") {
        delete this.editForm.value[key];
      }
    });
    this.admin = this.editForm.value;
    console.log(this.admin);
    this.adminsService.updateAdminById(this.admin).subscribe(
      (data) => {
        this.toastService.showSuccess("Admin Updated Successfully");
        this.editDialog = false;
        this.getAll();
      },
      (error) => {
        this.toastService.showError("Admin Not Updated");
      }
    );
  }

  private getAll() {
    this.loading = true;
    this.adminsService.getAdmins().subscribe(
      (data) => {
        this.admins = data.data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toastService.showError("Error Loading Admins");
      }
    );
  }
}
