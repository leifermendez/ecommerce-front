import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../../../../shared/services/rest.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shipping-box',
  templateUrl: './shipping-box.component.html',
  styleUrls: ['./shipping-box.component.css']
})
export class ShippingBoxComponent implements OnInit {
  @Input() id: any = null;
  public loading = false;
  public data: any;

  constructor(private rest: RestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.id) {
      this.loadData();
    }
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`/rest/delivery/${this.id}?for=true`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.data = response['data'];
        }
      });
  };

}
