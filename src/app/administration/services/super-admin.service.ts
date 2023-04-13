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
export class SuperAdminService {
  constructor() {}
}
