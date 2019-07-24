import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {ShoppingCartComponent} from '../../components/shopping-cart/shopping-cart.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ListProductStoreComponent} from '../store/listproduct/listproduct.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  public loading = false;
  public filters: any = [];
  public data: any = [];
  public meta_key: any = [];
  public src: any = null;

  constructor(private rest: RestService, private util: UtilsService,
              private shopping: ShoppingCartComponent,
              private list: ListProductStoreComponent,
              private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.src = (params.src) ? params.src : null;
      this.list.loadSrc(this.src);
    });
  }

  setVariable = (a) => this.filters = a;


}
