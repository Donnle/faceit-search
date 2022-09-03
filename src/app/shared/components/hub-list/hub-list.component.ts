import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {HubInfo} from '../../interfaces/hub-info';
import {HubService} from '../../services/hub.service';

@Component({
  selector: 'app-hub-list',
  templateUrl: './hub-list.component.html',
  styleUrls: ['./hub-list.component.scss']
})
export class HubListComponent implements OnInit {
  hubsInfo: HubInfo[] = [];

  constructor(private dataService: DataService, private hubService: HubService) {
  }

  ngOnInit(): void {
    this.hubService.hubsInfo$.subscribe((hubsInfo: HubInfo[]) => this.hubsInfo = hubsInfo);
  }
}
