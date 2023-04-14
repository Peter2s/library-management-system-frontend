import { Injectable, OnInit } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { HttpOptions } from "src/app/models/IHttp-options";
import { AuthService } from "./auth.service";
import { IManagersResponse } from "../../models/IManagersResponse";
import { IManagers } from "../../models/IManagers";
import { IManagerResponse } from "src/app/models/IManagerResponse";

@Injectable({
  providedIn: "root",
})
export class EmployeesService implements OnInit {
  httpHeaders: any = {};

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  getEmployees(): Observable<IManagersResponse> {
    const options: HttpOptions = {
      headers: this.httpHeaders,
    };
    let endpoint = "/employee";
    return this.apiService.get<IManagersResponse>(endpoint, options);
  }

  //   Add Employee
  addEmployee(employee: IManagers): Observable<IManagerResponse> {
    const options: HttpOptions = {
      headers: this.httpHeaders,
    };
    return this.apiService.post<IManagerResponse>(
      "/Employee",
      employee,
      options
    );
  }

  //   Get Employee by id
  getEmployeeById(id: string | null): Observable<IManagerResponse> {
    return this.apiService.get<IManagerResponse>(`${id}`);
  }

  //  Update Employee by id
  updateEmployeeById(employee: IManagers): Observable<IManagers> {
    return this.apiService.patch<IManagers>(
      `/employee/${employee._id}`,
      employee
    );
  }

  //   Delete Employee by id
  deleteEmployeeById(id: number | null): Observable<IManagers> {
    return this.apiService.delete<IManagers>(`/employee/${id}`);
  }
}
