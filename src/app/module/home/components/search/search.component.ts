import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {Router} from '@angular/router';
import {NgSelectConfig} from '@ng-select/ng-select';
import {UtilsService} from '../../../../shared/services/util.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  datafilter = [];
  public form: any = FormGroup;
  public src: any = null;

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
      this.router.navigateByUrl(`/single/${e['id']}-${this.util.slug(e['name'])}`);
    }
  };

  search(src: any) {
    this.src = src.term;
    if (src.term.length > 4) {
      // this.rest.get(`/rest/search?src=${src.term}`)
      //   .then((response: any) => {
      //     console.log(response);
      //     if (response.data.products.length > 0) {
      //       this.datafilter = response.data.products;
      //     }
      //   }).catch(error => {
      //   console.log(error);
      // });
    }
  }

}
