import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../../../../shared/services/rest.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  // @ts-ignore
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  public loading = false;
  public categories = false;
  public variations = false;
  public id: any = false;


  constructor(private route: ActivatedRoute,
    private rest: RestService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient) {


  }



  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].disabled = false;
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
    this.route.params.subscribe(params => {
      this.id = params['id'];
      switch (params['step']) {
        case 'categories':
          this.selectTab(1);
          break
        case 'gallery':
          this.selectTab(2);
          break
        case 'variations':
          this.selectTab(3);
          break
        default:
          this.selectTab(0)
      }
    });


    if (this.id) {
      this.staticTabs.tabs[1].disabled = false;
      this.staticTabs.tabs[2].disabled = false;
      this.staticTabs.tabs[3].disabled = false;
    } else {
      this.staticTabs.tabs[1].disabled = true;
      this.staticTabs.tabs[2].disabled = true;
      this.staticTabs.tabs[3].disabled = true;
    }

  }

}
