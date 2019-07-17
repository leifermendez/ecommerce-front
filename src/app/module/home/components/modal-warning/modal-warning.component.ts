import {Component, OnInit} from '@angular/core';
import {RestService} from '../../../../shared/services/rest.service';
import {UtilsService} from '../../../../shared/services/util.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal-warning',
  templateUrl: './modal-warning.component.html',
  styleUrls: ['./modal-warning.component.css']
})
export class ModalWarningComponent implements OnInit {
  public loading_save = false;
  public form: any = FormGroup;
  public editform: any = {};
  public delivered: any = false;

  constructor(private rest: RestService, private util: UtilsService, private fb: FormBuilder) {
    this.form = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.form.controls;
  }

  send() {
    this.loading_save = true;
    this.rest.post('/rest/newsletter', this.editform)
      .then((response: any) => {
        this.loading_save = false;
        this.util.openSnackBar(
          'Gracias!',
          'success'
        );
        this.delivered = true;
      }).catch((error: any) => {
      this.loading_save = false;
      this.util.openSnackBar(
        'Error!',
        'error'
      );
    });
  }
}
