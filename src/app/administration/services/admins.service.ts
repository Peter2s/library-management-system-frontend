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
    // return this.apiService.get<IManagerResponse>(`/admin/${id}`);
  }

  //  Update admin by id
  updateAdminById(
    id: number | undefined,
    admin: IManagers
  ): Observable<IUpdateMessage> {
    return this.apiService.patch<IUpdateMessage>(`/admin/${id}`, admin);
  }

  //   Delete admin by id
  deleteAdminById(id: string | null): Observable<IDeleteMessage> {
    return this.apiService.delete<IDeleteMessage>(`/admin/${id}`);
  }

  //   End of class
}
