import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-modal-filter-attributes',
  templateUrl: './modal-filter-attributes.component.html',
  styleUrls: ['./modal-filter-attributes.component.css']
})
export class ModalFilterAttributesComponent implements OnInit {
  public loading = false;
  public filters: any = {};

  constructor(public bsModalRef: BsModalRef,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }

  setVariable = (a) => {
    this.bsModalRef.hide()
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        filters: `product_categories.category_id,=,${a.id}`
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  };

  setAttribute = (a) => {
    this.bsModalRef.hide()
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        attributes_filter: `att.value,=,${a.value}?att.attributes_id,=,${a.attr_id}`
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
    });
  };

}
