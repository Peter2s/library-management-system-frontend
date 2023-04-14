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
export class SuperSuperAdminService {
  httpHeaders: any = {};

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}
  getSuperAdmins(): Observable<IManagersResponse> {
    const options: HttpOptions = {
      headers: this.httpHeaders,
    };
    let endpoint = "/superAdmin";
    return this.apiService.get<IManagersResponse>(endpoint, options);
  }

  //   Add SuperAdmin
  addSuperAdmin(SuperAdmin: IManagers): Observable<IManagerResponse> {
    const options: HttpOptions = {
      headers: this.httpHeaders,
    };
    return this.apiService.post<IManagerResponse>(
      "/superAdmin",
      SuperAdmin,
      options
    );
  }

  //   Get SuperAdmin by id
  getSuperAdminById(id: string | null): Observable<IManagerResponse> {
    return this.apiService.get<IManagerResponse>(`${id}`);
  }

  //  Update SuperAdmin by id
  updateSuperAdminById(
    id: number | undefined,
    SuperAdmin: IManagers
  ): Observable<IManagers> {
    return this.apiService.patch<IManagers>(`/superAdmin/${id}`, SuperAdmin);
  }

  //   Delete SuperAdmin by id
  deleteSuperAdminById(id: number | null): Observable<IManagers> {
    return this.apiService.delete<IManagers>(`/superAdmin/${id}`);
  }
}
