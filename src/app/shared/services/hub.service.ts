import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HubInfo} from '../interfaces/hub-info';
import {UserData} from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  userData: UserData;
  hubsInfo$: BehaviorSubject<HubInfo[]> = new BehaviorSubject<HubInfo[]>([]);

  constructor() {
    const hubsInfoFromLocalStorage = JSON.parse(localStorage.getItem('hubs-info')) || [];
    this.hubsInfo$.next(hubsInfoFromLocalStorage);
  }

  addNewHub(newHubData: HubInfo) {
    const newHubs = this.hubsInfo$.getValue().concat([newHubData]);
    localStorage.setItem('hubs-info', JSON.stringify(newHubs));
    this.hubsInfo$.next(newHubs);
  }
}
