import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../../shared/services/rest.service';
import {TabsetComponent} from 'ngx-bootstrap';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  // @ts-ignore
  @ViewChild('staticTabs', {static: false}) staticTabs: TabsetComponent;
  public loading = false;
  public categories = false;
  public variations = false;

  constructor() {

  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  callback_data_categories = (e) => {
    this.categories = e['id'];
    this.staticTabs.tabs[1].disabled = false;
    this.selectTab(1);
  };

  callback_data_variations = (e) => {
    this.variations = e['id'];
    this.staticTabs.tabs[2].disabled = false;
    this.selectTab(2);
  };

  ngOnInit() {
    this.staticTabs.tabs[1].disabled = true;
    // this.staticTabs.tabs[2].disabled = true;
  }

}
