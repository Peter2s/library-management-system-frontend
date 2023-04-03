import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface IAuthResponse {
  accessToken: string;
  refreshToken:string
}