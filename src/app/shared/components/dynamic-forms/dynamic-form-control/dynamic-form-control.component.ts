import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormControl_Base } from 'src/app/shared/models/dynamic-forms/dynamicformcontrol-base';

declare var $: any;

@Component({
  selector: 'shared-dynamic-formcontrol',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss']
})
export class DynamicFormControlComponent implements OnInit, AfterViewInit {
  @Input() control: DynamicFormControl_Base<any>;
  @Input() form: FormGroup;

  get isInvalid() { return this.form.controls[this.control.key].invalid && this.form.controls[this.control.key].touched; }

  constructor() { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {
  }

  hasError = (errorName: string) => {
    return this.form.controls[this.control.key].hasError(errorName);
  }
}
