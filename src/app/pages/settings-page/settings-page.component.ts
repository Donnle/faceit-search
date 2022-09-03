import {Component} from '@angular/core';
import {ButtonData} from '../../shared/interfaces/button-data';
import {FormBuilder} from '@angular/forms';
import {DataService} from '../../shared/services/data.service';
import {UserData} from '../../shared/interfaces/user-data';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
  popupInfo: string;
  userData: UserData;
  buttonData: ButtonData = {
    size: 'small',
    icon: './assets/icons/save.png',
    name: 'SAVE',
    classMode: 'gray'
  };
  form: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.dataService.userData$.subscribe((userData: UserData) => {
      this.userData = userData;
    });
    this.form = this.formBuilder.group({
      bearer: this.userData.bearer || '',
      nickname: this.userData.nickname || '',
      minLevel: this.userData.minLevel || '',
      maxLevel: this.userData.maxLevel || ''
    });
  }

  get isFormValid(): string {
    const {bearer, nickname, minLevel, maxLevel} = this.form.value;
    if (!bearer) {
      return 'You miss bearer!';
    } else if (!this.isBearerValid(bearer)) {
      return 'bearer must look like ********-****-****-****-************ !';
    } else if (!nickname) {
      return 'You miss nickname!';
    } else if (minLevel > maxLevel) {
      return 'Min level can not be great than max!';
    } else if (minLevel < 1 || minLevel > 10) {
      return 'Min lvl must be between 1 and 10!';
    } else if (maxLevel < 1 || maxLevel > 10) {
      return 'Max lvl must be between 1 and 10!';
    }
    return 'valid';
  }

  isBearerValid(bearer: string): boolean {
    const validBearerLengths = [8, 4, 4, 4, 12];
    return bearer.split('-').filter((item, index) => item.length === validBearerLengths[index]).length === 5;
  }

  onSubmit() {
    const message = this.isFormValid;
    if (message !== 'valid') {
      this.popupInfoMessage(message);
      return;
    }
    this.popupInfoMessage('User data success saved!');
    this.dataService.setUserData(this.form.value);
  }

  popupInfoMessage(msg: string, timeToHideMs: number = 3000) {
    this.popupInfo = msg;
    setTimeout(() => this.popupInfo = '', timeToHideMs);
  }
}
