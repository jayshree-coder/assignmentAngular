import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public APIEndpoint = environment.API_URL;
  constructor(
    private _httpClient : HttpClient
  ) { }
  

  makeGetRequest(url: string): any {
    return this._httpClient.get<any>(`${this.APIEndpoint}/${url}`);
  }

  makePostRequest(url: string, requestBody: any):Observable <any>{
    return this._httpClient.post<any>(`${this.APIEndpoint}/${url}`, requestBody);
  }

  makePutRequest(url: string, requestBody: any): any{
    return this._httpClient.put<any>(`${this.APIEndpoint}/${url}`, requestBody);
  }

  makeDeleteRequest(url: string): any {
    return this._httpClient.delete<any>(`${this.APIEndpoint}/${url}`);
  }

}
