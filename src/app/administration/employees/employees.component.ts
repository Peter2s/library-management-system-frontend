import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { EmployeesService } from "../services/employees.service";
import { IManagers } from "../../models/IManagers";
import { IManagerResponse } from "../../models/IManagerResponse";
import { ToastService } from "../services/toast.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"],
  providers: [MessageService, ConfirmationService, ToastService, DatePipe],
})
export class EmployeesComponent implements OnInit {
  employees: IManagers[];
  employee: IManagers;
  addForm: FormGroup;
  editForm: FormGroup;
  addDialog: boolean;
  editDialog: boolean;
  loading: boolean;
  image: any;
  public validationErrors?: { [p: string]: string };
  roles: string[];

  constructor(
    private messageService: MessageService,
    public confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private employeesService: EmployeesService
  ) {
    this.employees = [];
    this.employee = {} as IManagers;
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
  private getAll() {
    this.loading = true;
    this.employeesService.getEmployees().subscribe(
      (data) => {
        this.employees = data.data;
        this.loading = false;
      },
      (error) => {
        this.toastService.showError("Error Loading Admins");
      }
    );
  }

  showAddDialog() {
    this.employee = {} as IManagers;
    this.addDialog = true;
    this.validationErrors = {};
  }

  cancelAddDialog() {
    this.addDialog = false;
  }

  Add() {
    Object.keys(this.addForm.value).forEach((key) => {
      if (this.addForm.value[key] === "") {
        delete this.addForm.value[key];
      }
    });
    console.log(this.addForm.value);
    this.employee = this.addForm.value;
    this.employeesService.addEmployee(this.employee).subscribe(
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

  confirmDelete(employee: IManagers) {
    this.employee = employee;
    this.confirmationService.confirm({
      message:
        "Are you sure that you want to delete " +
        employee.firstName +
        " " +
        employee.lastName +
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
    this.employeesService.deleteEmployeeById(this.employee._id).subscribe(
      (data) => {
        this.toastService.showSuccess("Admin Deleted Successfully");
        this.getAll();
      },
      (error) => {
        this.toastService.showError("Admin Not Deleted");
      }
    );
  }

  showEditDialog(employee: IManagers) {
    // @ts-ignore
    employee.birthDate = this.datePipe.transform(
      employee.birthDate,
      "yyyy-MM-dd"
    );
    this.editForm.patchValue(employee);
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
    this.employee = this.editForm.value;
    this.employeesService.updateEmployeeById(this.employee).subscribe(
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
