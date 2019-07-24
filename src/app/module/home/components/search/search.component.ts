import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {Router} from '@angular/router';
import {NgSelectConfig} from '@ng-select/ng-select';
import { UtilsService } from '../../../../shared/services/util.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  datafilter = [];
  public src: any = null;
  constructor(private rest: RestService, 
    private util: UtilsService,
    private router: Router, private config: NgSelectConfig) {
    this.config.notFoundText = 'Sin resultado, asegurate de elegir la opción correcta.';
  }

  ngOnInit() {
  }
  selectOptions = (e) => {
    if (e && e['id']) {
      this.src = {}
      this.router.navigateByUrl(`/single/${e['id']}-${this.util.slug(e['name'])}`);
    }
  }

  search(src: any) {
    console.log(src);
    if (src.term.length > 2) {
      this.rest.get(`/rest/search?src=${src.term}`)
        .then((response: any) => {
          console.log(response);
          if (response.data.products.length > 0) {
            this.datafilter = response.data.products;
          }
        }).catch(error =>  {
        console.log(error);
      });
    }
  }

}
