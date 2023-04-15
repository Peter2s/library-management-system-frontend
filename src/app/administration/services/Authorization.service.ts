import { Injectable } from "@angular/core";
import { Roles } from "src/app/models/Roles";
import jwt_decode from "jwt-decode";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizationService {
  private currentUserRole: Roles;
  constructor(
    private authService: AuthService,
  ) {
    this.currentUserRole = this.getLoggedInUserRole();
  }

  // Method to get the role of the logged-in user
  getLoggedInUserRole(): any {
    const token = localStorage.getItem("accessToken");
    // @ts-ignore
    if(jwt_decode(token).ext > Date.now() / 1000) {
        this.authService.logout();
    }
    const decoded = this.getRoleFromToken(token!);
    this.currentUserRole === decoded;
    if (this.isValidRole(decoded!, Roles))
        return this.currentUserRole;
  }

  private isValidRole(value: string, enumObj: any): boolean {
    return Object.values(enumObj).includes(value);
  }

  private getRoleFromToken(token: string): string | null {
    try {
      const decodedToken: any = jwt_decode(token);
      return decodedToken ? decodedToken.role : null;
    } catch (err) {
      console.error("Error decoding JWT accessToken:", err);
      return null;
    }
  }
}
