import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css']
})
export class CreateShopComponent implements OnInit {
  public cif_flag: any = null;
  public data_shops: any = [];
  public id = null;
  public data_inside: any = {}
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']

      // In a real app: dispatch action to load the details here.
    });
  }

  cif_callback = (e) => {
    this.cif_flag = e;
    this.data_inside['legal_id'] = e;
  }

}
