import { Component } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { DatabusService } from "./services/databus.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularAssignement';
  constructor(private cookieService: CookieService, private authService: DatabusService) {}

  ngOnInit() {
    this.checkUserLoginStatus();
  }

  checkUserLoginStatus(): void {
    if (this.cookieService.check('_token')) {
      this.authService.getUserProfileDetails();
    }
  }
}
