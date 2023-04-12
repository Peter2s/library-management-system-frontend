import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { AuthService } from "../..//administration/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // add authorization header with jwt token
    const currentUserToken = this.authService.token();
    if (currentUserToken ) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserToken}`,
        },
      });
    }
    return next.handle(req);
  }
}
