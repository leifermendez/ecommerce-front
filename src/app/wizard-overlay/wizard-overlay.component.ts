import { Component, OnInit } from '@angular/core';
import {UtilsService} from '../shared/services/util.service';

@Component({
  selector: 'app-wizard-overlay',
  templateUrl: './wizard-overlay.component.html',
  styleUrls: ['./wizard-overlay.component.css']
})
export class WizardOverlayComponent implements OnInit {

  constructor(public util: UtilsService) { }

  ngOnInit() {
  }

}
