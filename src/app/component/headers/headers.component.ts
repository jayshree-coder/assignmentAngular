import { Component, OnInit } from "@angular/core";
import {  FormControl,FormGroup,Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { DatabusService } from "src/app/services/databus.service";
import { ToastrService } from "ngx-toastr";
import { logout } from "src/app/config/endpoints";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-headers",
  templateUrl: "./headers.component.html", 
})
export class HeadersComponent implements OnInit {
  public user :any
  constructor(
    private _apiService: ApiService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cookieService: CookieService,
    private _databusService: DatabusService,

  ) {}

  ngOnInit(): void {
    this._databusService.userProfileDetails$.subscribe((user: any) => {
      this.user = user;
      console.log("usersss>>>", this.user)

    });
  }
  logout(): void{
    this._apiService.makePostRequest(logout,'')
    .subscribe(
      (response: any) => {
        console.log('login successfully done', response);
        this._cookieService.delete('_token', '/');
        this._cookieService.delete('role', '/');
        this._cookieService.delete('_id', '/');

        this._router.navigate([ "/" ]);

      },
      (error: any) => {
        console.error('Registration failed', error);
        this._toastrService.error("Logout Failed");

      }
    );
   
  }}
