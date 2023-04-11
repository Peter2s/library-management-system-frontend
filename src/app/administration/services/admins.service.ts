import { Injectable, OnInit } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { IManagersResponse } from "../../models/IManagersResponse";
import { IManagers } from "../../models/IManagers";
import { IManagerResponse } from "src/app/models/IManagerResponse";
@Injectable({
  providedIn: "root",
})
export class AdminsService implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit() {}

  //  Get all admins
  getAdmins(url: string): Observable<IManagersResponse> {
    return this.apiService.get<IManagersResponse>(url);
  }
  //   Add admin
  addAdmin(admin: IManagers) {
    return this.apiService.post<IManagersResponse>("/admin", admin);
  }
  //   Get admin by id
  getAdminById(id: string | null): Observable<IManagerResponse> {
    return this.apiService.get<IManagerResponse>(`${id}`);
  }
}
