import { Component, OnInit } from "@angular/core";
import {  FormControl,FormGroup,Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { ToastrService } from "ngx-toastr";
import { register } from "src/app/config/endpoints";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: [ "./signup.component.scss" ],
})
export class SignupComponent implements OnInit {
 
 public submitted = false;

 public signupForm = new FormGroup({
  "username": new FormControl("", [ Validators.required ]),
  
  "email": new FormControl("", [ Validators.required, Validators.email ]),
  "password": new FormControl("", [ Validators.required, Validators.minLength(6) ]),
  
},
);

  constructor(
    private _apiService: ApiService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
   
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.invalid) return;
    this._apiService.makePostRequest(register, this.signupForm.value).subscribe((response: any) => {
      console.log("resposne>>>", response)
      this.submitted = false;
    }, (error: any) => {
    });
  }
 

  
}
