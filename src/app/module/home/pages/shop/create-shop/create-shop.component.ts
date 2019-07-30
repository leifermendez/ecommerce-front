import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestService} from '../../../../../shared/services/rest.service';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {PreventWizardComponent} from '../../../components/prevent-wizard/prevent-wizard.component';
import {BsModalRef, BsModalService, TabsetComponent} from 'ngx-bootstrap';
import {ModalProductBankComponent} from '../../products/create-product/modal-product-bank/modal-product-bank.component';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css']
})
export class CreateShopComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('staticTabs', {static: false}) staticTabs: TabsetComponent;
  public cif_flag: any = null;
  public data_shops: any = [];
  public id = null;
  config = {
    ignoreBackdropClick: true,
    keyboard: false
  };
  modalRef: BsModalRef;
  public loading = false;
  public data_inside: any = {};
  public filesReady: any;
  public tabs: any = {products: true};

  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.loadData(this.id);
      }
    });

  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params && params['step']) {
        this.selectTab(params['step']);
      }
    });
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  emitBack = () => this.ngOnInit();

  loadData = (id) => {
    const _this = this;
    this.rest.get(`/rest/prevent-check/${id}`)
      .then((response: any) => {
        this.loading = false;
        if (response['status'] === 'success') {
          const _data = response['data'];
          if (!_data['bank'] || !_data['schedule']) {
            this.openPrevent(_data);
          }
        }
      });
  };

  openPrevent(data) {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
      data,
      id: this.id
    };

    this.modalRef = this.modalService.show(
      PreventWizardComponent,
      Object.assign({initialState}, {
          class: 'gray modal-lg top-modal box-shadow-modal responsive'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }


  cif_callback = (e) => {
    this.cif_flag = e;
    this.data_inside = e;
  };

}
