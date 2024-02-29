import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { register } from "src/app/config/endpoints";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: [ "./login.component.scss" ],
})
export class LoginComponent implements OnInit {
 

  

  constructor(
    public router: Router,
    
  ) {}

  ngOnInit() {
  
  }


 

  
}
