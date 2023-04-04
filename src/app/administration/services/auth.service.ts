import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IAuthResponse } from 'src/app/models/IAuthResponse';
import { ILogin } from 'src/app/models/ILogin';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private api: ApiService) {}

  public login(credentials:ILogin): Observable<IAuthResponse> {
    return this.api.post("/login/administration", credentials);
  }
}
