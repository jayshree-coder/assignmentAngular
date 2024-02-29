import { Component, OnInit } from "@angular/core";
import {  FormControl,FormGroup,Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { ToastrService } from "ngx-toastr";
import { login } from "src/app/config/endpoints";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [ "./login.component.scss" ],
})
export class LoginComponent implements OnInit {
 
  public submitted = false;
  public showPassword = false;
  public LoginForm = new FormGroup({
   
   "email": new FormControl("", [ Validators.required, Validators.email ]),
   "password": new FormControl("", [ Validators.required, Validators.minLength(6) ]),
 },
 );
 
  
 public togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}
  constructor(
    private _apiService: ApiService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cookieService: CookieService,
  ) {}

  ngOnInit() {
  
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.LoginForm.invalid) return;
    this._apiService.makePostRequest(login, this.LoginForm.value)
    .subscribe(
      (response: any) => {
        console.log('login successfully done', response);
        this._cookieService.set('_token', response.token, 1, '/', '', false, "Strict");
        this._cookieService.set('role', 'admin', 1, '/', '', false, "Strict");
        this._cookieService.set('_id', '4', 1, '/', '', false, "Strict");

        this._router.navigate(['user/dashboard']); 

      },
      (error: any) => {
        console.error('Registration failed', error);
        this._toastrService.error("Login Failed");

      }
    );
}

  
}
