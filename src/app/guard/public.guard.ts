import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PublicGuard {
  constructor(
    public router: Router,
    private _cookieService: CookieService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._cookieService.get("_token")) {
      return false;
    } else {
      return true;
    }
  }
}
