import {Component, OnInit} from '@angular/core';
import {ZipLocationComponent} from '../../components/zip-location/zip-location.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {CookieService} from 'ngx-cookie-service';
import {AuthshopService} from '../../../auth/authshop.service';
import {WelcomeComponent} from '../../components/welcome/welcome.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true
  };
  public data: any = {};
  public welcome: any = false;

  constructor(private modalService: BsModalService,
              private cookieService: CookieService,
              private auth: AuthshopService) {
  }

  emitBack = () => this.ngOnInit();

  open() {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
    };

    this.modalRef = this.modalService.show(
      WelcomeComponent,
      Object.assign({initialState}, {
          class: 'gray modal-lg top-modal box-shadow-modal'
        },
        this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }

  ngOnInit() {
    this.welcome = this.cookieService.get('_wizard_dashboard');
    if (!this.welcome) {
      this.open();
    }
  }

}
