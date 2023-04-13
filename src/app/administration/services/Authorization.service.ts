import { Injectable } from "@angular/core";
import { Roles } from "src/app/models/Roles";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthorizationService {
  private currentUserRole: Roles;
  constructor() {
    this.currentUserRole = this.getLoggedInUserRole();
  }

  // Method to get the role of the logged-in user
  getLoggedInUserRole(): any {
    const token = localStorage.getItem("accessToken");
    const decoded = this.getRoleFromToken(token!);
    console.log("role", decoded);
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
