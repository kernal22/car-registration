import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private _http: HttpService) {}

  public getCarList() {
    return this._http._getCall('https://s3-ap-southeast-1.amazonaws.com/he-public-data/Cars9096be5.json');
  }

  public getAutoPartList() {
    return this._http._getCall('https://s3-ap-southeast-1.amazonaws.com/he-public-data/ListOfAutoParts1aaa4e5.json');
  }

  public postCarData(data: any) {
    return this._http._postCall('/car-registration', data);
  }
}
