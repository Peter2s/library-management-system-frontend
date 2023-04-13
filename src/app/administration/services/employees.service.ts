import { Injectable, OnInit } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { IManagersResponse } from "../../models/IManagersResponse";
import { IManagers } from "../../models/IManagers";
import { IManagerResponse } from "src/app/models/IManagerResponse";
import { IDeleteMessage } from "src/app/models/IDeleteMessage";
import { IUpdateMessage } from "../../models/IUpdateMessage";

@Injectable({
  providedIn: "root",
})
export class EmployeesService implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit() {}

  //  Get all employees
  getEmployee(url: string): Observable<IManagersResponse> {
    return this.apiService.get<IManagersResponse>(url);
  }
  //   Add employee
  addEmployee(admin: IManagers) {
    return this.apiService.post<IManagersResponse>("/employee", admin);
  }
  //   Get employee by id
  getEmployeeById(id: string | null): Observable<IManagerResponse> {
    return this.apiService.get<IManagerResponse>(`${id}`);
    // return this.apiService.get<IManagerResponse>(`/employee/${id}`);
  }

  //  Update employee by id
  updateEmployeeById(
    id: number | undefined,
    admin: IManagers
  ): Observable<IUpdateMessage> {
    return this.apiService.patch<IUpdateMessage>(`/employee/${id}`, admin);
  }

  //   Delete employee by id
  deleteEmployeeById(id: string | null): Observable<IDeleteMessage> {
    return this.apiService.delete<IDeleteMessage>(`/employee/${id}`);
  }
}
