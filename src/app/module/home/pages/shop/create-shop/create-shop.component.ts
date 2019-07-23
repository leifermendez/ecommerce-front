import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../../../../shared/services/rest.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css']
})
export class CreateShopComponent implements OnInit {
  public cif_flag: any = null;
  public data_shops: any = [];
  public id = null;
  public loading = false;
  public data_inside: any = {}
  public filesReady: any;
  public tabs: any = { dashboard: true };
  constructor(private route: ActivatedRoute,
    private rest: RestService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']

      // In a real app: dispatch action to load the details here.
    });
  }

  uploadSave = () => {
    this.loading = true;
    this.filesReady.forEach(file => {
      const formData = new FormData();
      formData.append('attached', file);
      formData.append('type_file', 'image');

      this.httpClient.post<any>(
        `${this.rest.url}/rest/media`, formData,
        { headers: this.rest.getHeadersMedia() })
        .subscribe(
          (res) => {
            this.loading = false;
            return res;
          },
          (err) => {
            this.loading = false;
          }
        );
    })

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

  cif_callback = (e) => {
    this.cif_flag = e;
    this.data_inside = e;
  }

}
