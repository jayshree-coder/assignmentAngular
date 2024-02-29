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
    this._apiService.makeGetRequest(`${user}/4`).subscribe((res: any) => {

      res.data ? this.userProfileDetails.next(res.data) : this.userProfileDetails.next(null);
    });
  }
  generateTempKey(): string {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
  
}
