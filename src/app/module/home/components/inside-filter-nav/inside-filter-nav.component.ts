import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-inside-filter-nav',
  templateUrl: './inside-filter-nav.component.html',
  styleUrls: ['./inside-filter-nav.component.css']
})
export class InsideFilterNavComponent implements OnInit {
  @Input() placeholder: any = '';
  public form: any = FormGroup;
  constructor(private fb: FormBuilder) { 
    this.form = fb.group({
      'src': [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() {
  }

  find = () => {}

}
