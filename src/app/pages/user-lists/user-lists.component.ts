import { Component, OnInit } from "@angular/core";
import {  FormControl,FormGroup,Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { DatabusService } from "src/app/services/databus.service";
import { ToastrService } from "ngx-toastr";
import { user } from "src/app/config/endpoints";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.scss']
})
export class UserListsComponent implements OnInit {
  userApproved: boolean = false; 

  public userList: any = [];
  public userId : any;
  currentPage: number = 1;
  totalPages: number[] = [];
  total: number = 0;
  pageSize: number = 10;
  loading: boolean = false;
  currentUser: any;
  currentUserId: any;

  constructor(
    private _apiService: ApiService,
    private _databusService: DatabusService,

    private _toastrService: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cookieService: CookieService,
  ) { }
  ngOnInit(): void {
    this.loadUserList();
  }
  loadUserList() {
    const perPage = 10; 
    this.loading = true; 

    this._apiService.makeGetRequest(`${user}?per_page=${perPage}&page=${this.currentPage}`).subscribe(
      (res: any) => {
        console.log("getUserlist", res);
        this.userList = res.data;
        this.userList = res.data;
        this.total = res.total;
        this.calculateTotalPages();
        this.loading = false; 
      },
      (error: any) => {
        console.error("Error loading user list:", error);
        this._toastrService.error("Failed to load user list. Please try again later.");
      }
    );
  }

  
  approveUser(user: any) {
    console.log("Approving user", user);
    this.currentUser = this._cookieService.get('role');
    this.currentUserId = this._cookieService.get('_id');
    console.log("getidddd>>>", this.currentUserId, )
    if (this.currentUser !== 'admin') {
      this._toastrService.error('You do not have permission to perform this action.');
      return;
    }
    if (user.id == this.currentUserId) {
      this._toastrService.error('You cannot approve your own record.');
      return;
    }
    const tempKey = this._databusService.generateTempKey();
    
    this._apiService.makePutRequest(`user/${user.id}`, { tempKey: tempKey, status: "approved", id: user.id }).subscribe(
      (res: any) => {
        console.log("User approval response", res);
        if (res.status === "approved" && user.id == res.id) {
          this._cookieService.set("temp_key", res.tempKey, 1, "/", "", false, "Strict");
          this.userApproved = true;
          this._toastrService.success("User Approved Successfully");
        }
      },
      (error: any) => {
        console.error("Error approving user:", error);
        this._toastrService.error("Failed to approve user. Please try again later.");
      }
    );
  }
  
  removeUser(user:any)
  {
    this.currentUser = this._cookieService.get('role');
    this.currentUserId = this._cookieService.get('_id');
    console.log("getidddd>>>", this.currentUserId, )
    if (this.currentUser !== 'admin') {
      this._toastrService.error('You do not have permission to perform this action.');
      return;
    }
    if (user.id == this.currentUserId) {
      this._toastrService.error('You cannot remove your own record.');
      return;
    }
    this._apiService.makeDeleteRequest(`user/${user.id}`).subscribe(
      (res: any) => {
        console.log("userssss>>>", res)
          this._toastrService.success("User Deleted Successfully");
        
      },
      (error: any) => {
        console.error("Error approving user:", error);
        this._toastrService.error("User Deleted Successfully");
      }
    );
  }

  calculateTotalPages() {
    this.totalPages = Array.from({ length: Math.ceil(this.total / this.pageSize) }, (_, i) => i + 1);
  }
  
  gotoPage(page: number) {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
      this.loadUserList(); 
    }
  }
  
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUserList(); 
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.loadUserList(); 
    }
  }
  
}
