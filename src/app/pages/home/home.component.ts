import { Component, OnInit } from "@angular/core";
import {  FormControl,FormGroup,Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { ToastrService } from "ngx-toastr";
import { user } from "src/app/config/endpoints";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: [ "./home.component.scss" ],
})
export class HomeComponent implements OnInit {
 
 

  constructor(
    private _apiService: ApiService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
   
  }

  
}
