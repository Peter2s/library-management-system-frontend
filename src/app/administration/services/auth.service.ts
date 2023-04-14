import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { IAuthResponse } from "src/app/models/IAuthResponse";
import { ILogin } from "src/app/models/ILogin";
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
import {IActivationAdministration} from "../../models/IActivationAdministration";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isLogin: boolean;

  constructor(private api: ApiService, private router: Router,) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      this._isLogin = true;
    } else this._isLogin = false;
  }

  public get isLogin(): boolean {
    return this._isLogin;
  }

  // public get_user(): Observable<any> {
  // }

  public login(credentials: ILogin): Observable<IAuthResponse> {
    return this.api.post("/login/administration", credentials);
  }

  public activationAdministration(credentials: IActivationAdministration): Observable<IAuthResponse> {
    return this.api.post("/activation/administration", credentials);
  }

  public storeTokens(res: IAuthResponse) {
    const decoded: any = jwt_decode(res.accessToken);
    localStorage.setItem("user", JSON.stringify(decoded));
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    this._isLogin = true;
  }
  public token(): string { 
    return localStorage.getItem("accessToken") || "";
  }

  public logout(): void {
    this._isLogin = false;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    this.router.navigate(["/home"]);
  }
}
