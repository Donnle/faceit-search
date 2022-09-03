import {Injectable} from '@angular/core';
import {UserData} from '../interfaces/user-data';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HeadersService} from './headers.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userData$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>({});

  constructor(private http: HttpClient, private headersService: HeadersService) {
    this.userData$.subscribe((userData: UserData) => {
      this.headersService.setUserData(userData);
    });

    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('data')) || {};
    this.userData$.next(userDataFromLocalStorage);
  }

  setUserData(newUserData: UserData) {
    this.getUserId(newUserData.nickname).subscribe((userData) => {
      const {id: userId} = userData.payload;
      localStorage.setItem('data', JSON.stringify({...newUserData, userId}));
      this.userData$.next({...newUserData, userId});
    });
  }

  getUserId(nickname): Observable<any> {
    return this.http.get(`/users/v1/nicknames/${nickname}`, {
      headers: this.headersService.getUserInfoHeaders()
    });
  }
}
