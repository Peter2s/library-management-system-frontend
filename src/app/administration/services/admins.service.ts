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
export class AdminsService implements OnInit {
  httpHeaders: any = {};

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  getAdmins(): Observable<IManagersResponse> {
    const options: HttpOptions = {
      headers: this.httpHeaders,
    };
    let endpoint = "/admin";
    return this.apiService.get<IManagersResponse>(endpoint, options);
  }

  //   Add admin
  addAdmin(admin: IManagers): Observable<IManagerResponse> {
    const options: HttpOptions = {
      headers: this.httpHeaders,
    };
    return this.apiService.post<IManagerResponse>("/admin", admin, options);
  }

  //   Get admin by id
  getAdminById(id: string | null): Observable<IManagerResponse> {
    return this.apiService.get<IManagerResponse>(`${id}`);
    // return this.apiService.get<IManagerResponse>(`/admin/${id}`);
  }

  //  Update admin by id
  updateAdminById(
    id: number | undefined,
    admin: IManagers
  ): Observable<IManagers> {
    return this.apiService.patch<IManagers>(`/admin/${id}`, admin);
  }

  //   Delete admin by id
  deleteAdminById(id: number | null): Observable<IManagers> {
    return this.apiService.delete<IManagers>(`/admin/${id}`);
  }

  //   End of class
}
