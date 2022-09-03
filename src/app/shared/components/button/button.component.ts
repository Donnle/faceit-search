import {Component, Input} from '@angular/core';
import {ButtonData} from '../../interfaces/button-data';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonData: ButtonData;

  constructor() {
  }
}
