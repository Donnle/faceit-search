import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {UserData} from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {
  userData: UserData;

  constructor() {
  }

  getSearchInfoHeaders() {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.userData.bearer);
  }

  getStartGameHeaders() {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.userData.bearer)
      .set('Content-Type', 'application/json')
      .set('Content-Length', `218`);
  }

  getHubInfoHeaders() {
    return new HttpHeaders()
      .set('Authorization', 'Bearer 4fa71c85-f22f-4c06-bb94-43a06cafd8dd');
  }

  getUserInfoHeaders() {
    return new HttpHeaders();
  }

  setUserData(newUserData: UserData) {
    this.userData = newUserData;
  }
}
