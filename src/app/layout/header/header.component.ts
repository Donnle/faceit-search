import {Component} from '@angular/core';
import {ElectronService} from '../../core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private electronService: ElectronService) {
  }

  minimize() {
    this.electronService.ipcRenderer.send('minimize-application');
  }

  close() {
    this.electronService.ipcRenderer.send('close-application');
  }
}
