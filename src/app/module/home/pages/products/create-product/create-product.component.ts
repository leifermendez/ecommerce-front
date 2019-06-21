import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../../../../shared/services/rest.service';
import {TabsetComponent} from 'ngx-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

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
  public id: any = false;
  public filesReady: any;

  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private formBuilder: FormBuilder,
              private httpClient: HttpClient) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.route.queryParams.subscribe(params => {
      // this.id = params['id'];
      if (params && params['step']) {
        const index = (params['step']);
        console.log('--->',index)
        this.staticTabs.tabs[index].disabled = false;
        this.selectTab(index);
      }

    });
  }

  onFilesAdded(files: File[]) {

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
      };
      this.filesReady = files;
    });
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  uploadSave = () => {
    this.loading = true;
    this.filesReady.forEach(file => {
      const formData = new FormData();
      formData.append('attached', file);
      formData.append('type_file', 'image');

      this.httpClient.post<any>(
        `${this.rest.url}/rest/media`, formData,
        {headers: this.rest.getHeadersMedia()})
        .subscribe(
          (res) => {
            this.loading = false;
          },
          (err) => {
            this.loading = false;
          }
        );
    });

  };

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
    if (this.id) {

    }
    this.staticTabs.tabs[1].disabled = true;
    this.staticTabs.tabs[2].disabled = true;
    this.staticTabs.tabs[3].disabled = true;
  }

}
