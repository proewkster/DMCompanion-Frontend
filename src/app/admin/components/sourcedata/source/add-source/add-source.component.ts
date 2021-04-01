import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Console } from 'node:console';
import { validateLocaleAndSetLanguage } from 'typescript';

@Component({
  selector: 'admin-sourcedata-addsource',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.scss']
})
export class AddSourceComponent implements OnInit {

  public addSourceForm: FormGroup;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addSourceForm = this._formBuilder.group({
      sourceName: [null, [Validators.required, Validators.maxLength(100)]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addSourceForm.controls[controlName].invalid && (this.addSourceForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    this.addSourceForm.controls[controlName].hasError(errorName);
  }

  // Submit new Source
  public createSource = (addSourceValue) => {;
    console.log("test");
  }
}
