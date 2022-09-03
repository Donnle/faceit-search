import {Component} from '@angular/core';
import {ButtonData} from '../../shared/interfaces/button-data';
import {DataService} from '../../shared/services/data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HubService} from '../../shared/services/hub.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  isAddHubPopupOpen = false;
  form: FormGroup;

  buttonData: ButtonData = {
    classMode: 'green',
    size: 'large',
    name: 'ADD HUB',
  };
  submitButtonData: ButtonData = {
    classMode: 'green',
    size: 'medium',
    name: 'SUBMIT',
  };

  constructor(private dataService: DataService, private formBuilder: FormBuilder, private hubService: HubService) {
    this.form = this.formBuilder.group({
      hubLink: '',
      hubId: ''
    });
  }

  handleAddHubClick() {
    this.isAddHubPopupOpen = !this.isAddHubPopupOpen;
  }

  getIdFromFaceItLink(link) {
    const copyLink = link;
    const indexOfLink = copyLink.indexOf('/hub/') + '/hub/'.length;
    const indexOfSlashAfterId = copyLink.indexOf('/', indexOfLink);
    if (indexOfSlashAfterId === -1) {
      return copyLink.slice(indexOfLink);
    }
    return copyLink.slice(indexOfLink, indexOfSlashAfterId);
  }

  onSubmit() {
    const {hubLink, hubId} = this.form.value;
    const idFromLink = this.getIdFromFaceItLink(hubLink);
    this.hubService.addNewHub({idFromLink, hubId});
    this.form.reset();
  }
}
