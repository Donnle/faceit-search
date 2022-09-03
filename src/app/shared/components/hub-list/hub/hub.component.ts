import { Component, Input, OnInit } from '@angular/core';
import { HubInfo, HubInfoResponse } from '../../../interfaces/hub-info';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../services/data.service';
import { UserData } from '../../../interfaces/user-data';
import { RequestsService } from '../../../services/requests.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss'],
})
export class HubComponent implements OnInit {
  @Input() hubInfo: HubInfo;
  hubInfoResponse: HubInfoResponse;
  userData: UserData;
  isSearchActive = false;

  constructor(
    private dataService: DataService,
    private requestsService: RequestsService
  ) {}

  ngOnInit(): void {
    this.dataService.userData$.subscribe((userData) => {
      this.userData = userData;
    });

    this.requestsService
      .getHubInfo(this.hubInfo)
      .subscribe((hubInfoResponse: HubInfoResponse) => {
        this.hubInfoResponse = hubInfoResponse;
      });
  }

  onPlayButtonClick() {
    this.isSearchActive = !this.isSearchActive;
  }
}
