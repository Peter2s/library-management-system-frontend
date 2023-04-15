import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {IAuthResponse} from "src/app/models/IAuthResponse";
import {ILogin} from "src/app/models/ILogin";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(private api: ApiService) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            this._isLogin = true;
        } else this._isLogin = false;
    }

    private _isLogin: boolean;

    public get isLogin(): boolean {
        return this._isLogin;
    }

    public login(credentials: ILogin): Observable<IAuthResponse> {
        return this.api.post("/login/administration", credentials);
    }

    public memberLogin(credentials: ILogin): Observable<IAuthResponse> {
        return this.api.post("/login", credentials);
    }

    public storeTokens(res: IAuthResponse) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        this._isLogin = true;
    }

    public token(): string {
        return localStorage.getItem("accessToken") || "";
    }

    public logout(): void {
        this._isLogin = false;
    }
}
