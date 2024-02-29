import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { user } from '../config/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DatabusService {
  public userProfileDetails = new BehaviorSubject<any>(null);
  constructor(
    private _apiService: ApiService
  ) { }
  get userProfileDetails$() {
    return this.userProfileDetails.asObservable();
  }
  set userProfileDetails$(data: any) {
    this.userProfileDetails.next(data);
  }
  getUserProfileDetails() {
    this._apiService.makeGetRequest(user).subscribe((res: any) => {
      res.data ? this.userProfileDetails.next(res.data) : this.userProfileDetails.next(null);
    });
  }
  
  
}
