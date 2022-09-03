import {
  interval,
  map,
  Observable,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {UserInfo} from '../../interfaces/user-info';
import {HubInfo} from '../../interfaces/hub-info';
import {DataService} from '../../services/data.service';
import {UserData} from '../../interfaces/user-data';
import {RequestsService} from '../../services/requests.service';
import {HttpClient} from '@angular/common/http';
import {HeadersService} from '../../services/headers.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit, OnDestroy {
  @Input() hubInfo: HubInfo;
  @Input() isSearchActive = false;
  @Output() changeIsSearchStatus: EventEmitter<boolean> = new EventEmitter();

  userInQueueInfo: UserInfo;
  subscriber: Subscription;
  userData: UserData;
  postSubscriber: Subscription;

  constructor(
    private dataService: DataService,
    private requestsService: RequestsService
  ) {
  }

  ngOnInit(): void {
    this.dataService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
    this.subscriber = this.getUserInSearch().subscribe(
      (userInfo) => (this.userInQueueInfo = userInfo)
    );
  }

  getUserInSearch(): Observable<UserInfo> {
    // 0.33s do request
    return interval(1000 * 0.33).pipe(
      startWith(0),
      switchMap(() => this.requestsService.getUserInSearchInfo(this.hubInfo)),
      map((res: UserInfo) => {
        if (
          this.isSearchActive
          && res.payload.length > 0
          && res.payload[0].skillLevel >= this.userData.minLevel
          && res.payload[0].skillLevel <= this.userData.maxLevel
        ) {
          this.postSubscriber = this.requestsService.startSearch(this.hubInfo).subscribe();
          this.changeIsSearchStatus.emit();
          console.log('Player was found');
          console.log(`nickname: ${res.payload[0].nickname}, skillLvl: ${res.payload[0].skillLevel}`);
        } else if (this.isSearchActive && res.payload.length > 0) {
          console.log('User lvl is not in diapason');
        } else if (res.payload.length === 0) {
          console.log('Queue is clear');
        } else if (!this.isSearchActive && res.payload.length > 0) {
          console.log(
            `nickname: ${res.payload[0].nickname}, skillLvl: ${res.payload[0].skillLevel}`
          );
        }
        this.postSubscriber.unsubscribe();
        return res;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
