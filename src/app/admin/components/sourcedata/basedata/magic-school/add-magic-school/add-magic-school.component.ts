import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_MagicSchool } from 'src/app/admin/models/sourcedata/dto_sourcedata_magicschool';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-add-magic-school',
  templateUrl: './add-magic-school.component.html',
  styleUrls: ['./add-magic-school.component.scss']
})
export class AddMagicSchoolComponent implements OnInit, AfterViewInit {

  public addMagicSchoolForm: FormGroup;
  public sources: [SourceData_Source];
  public title: string;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addMagicSchoolForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [null, Validators.required]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addMagicSchoolForm.controls[controlName].invalid && (this.addMagicSchoolForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addMagicSchoolForm.controls[controlName].hasError(errorName);
  }

  // Submit new Magic School
  public createMagicSchool = (addMagicSchoolValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addMagicSchoolForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addMagicSchoolValue };

    // Create instance of Magic School model
    const magicSchool: DTO_SourceData_MagicSchool = {
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 3
    }

    // Create Magic School in API
    this._sourcedataService.createMagicSchool(magicSchool)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
