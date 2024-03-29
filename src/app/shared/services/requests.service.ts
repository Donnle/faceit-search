import {Injectable} from '@angular/core';
import {HubInfo, HubInfoResponse} from '../interfaces/hub-info';
import {UserData} from '../interfaces/user-data';
import {HttpClient} from '@angular/common/http';
import {HeadersService} from './headers.service';
import {DataService} from './data.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  userData: UserData;
  telegramAPIKey = '5753390467:AAF9RoTMZbYCl8_z3s-J70Z7onqUMKkJs9E';

  constructor(
    private http: HttpClient,
    private headersService: HeadersService,
    private dataService: DataService
  ) {
    this.dataService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
  }

  sendMessageToTelegram(text: string) {
    return this.http.post(
      `https://api.telegram.org/bot${this.telegramAPIKey}/sendMessage`,
      {
        chat_id: '808908111', // eslint-disable-line
        text
      }
    );
  }

  startSearch(hubInfo: HubInfo) {
    const {userId} = this.userData;
    return this.http.post(
      `/queue/v1/player/${hubInfo.hubId}`,
      {
        leaderId: userId,
        playerId: userId,
        playerType: 'solo',
        userIds: [userId],
      },
      {
        headers: this.headersService.getStartGameHeaders(),
      }
    );
  }

  getHubInfo(hubInfo: HubInfo): Observable<HubInfoResponse> {
    return this.http.get<HubInfoResponse>(
      `https://open.faceit.com/data/v4/hubs/${hubInfo.idFromLink}?expanded=organizer`,
      {
        headers: this.headersService.getHubInfoHeaders(),
      }
    );
  }

  getUserInSearchInfo(hubInfo: HubInfo) {
    return this.http.get<UserInfo>(`/queue/v1/player/${hubInfo?.hubId}`, {
      headers: this.headersService.getSearchInfoHeaders(),
    });
  }
}
