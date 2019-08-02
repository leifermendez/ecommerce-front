import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../shared/services/rest.service';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { UtilsService } from '../../../../shared/services/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  datafilter = [];
  public form: any = FormGroup;
  public src: any = null;
  public queryParams = {
    limit: 5,
    src: ''
  }

  constructor(private rest: RestService,
    private fb: FormBuilder,
    private util: UtilsService,
    private router: Router, private config: NgSelectConfig) {
    this.config.notFoundText = 'Sin resultado, asegurate de elegir la opción correcta.';
    this.form = fb.group({
      'src': '',
    });
  }

  ngOnInit() {

  }

  srcSend = (e) => {
    e.stopPropagation();
    this.router.navigateByUrl(`/search/${encodeURI(this.src)}`);
  }

  selectOptions = (e) => {
    if (e && e['id']) {
      // this.src = {};
      this.router.navigateByUrl(`/search/${encodeURI(this.src)}`);
    }
  };

  search(src: any) {
    this.src = src.term;
    console.log(this.src)
    if (src.term.length > 2) {
      this.queryParams['src'] = src.term;
      this.rest.get(`/rest/suggestions`, this.queryParams ,true)
        .then((response: any) => {
          if (response.data.length) {
            this.datafilter = response.data;
          }
        }).catch(error => {
          console.log(error);
        });
    }
  }

}
