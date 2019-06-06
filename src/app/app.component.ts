import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ZipLocationComponent} from './module/home/components/zip-location/zip-location.component';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'apatxee';

  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService) {
  }

  emitBack = () => this.ngOnInit();

  open() {
    const initialState = {
      ignoreBackdropClick: true,
      emitBack: this.emitBack,
    };

    this.modalRef = this.modalService.show(
      ZipLocationComponent,
      Object.assign({initialState}, {class: 'gray modal-lg'}, this.config)
    );
    this.modalRef.content.closeBtnName = 'Cerrar';
  }


  ngOnInit() {
    this.open();
  }
}
