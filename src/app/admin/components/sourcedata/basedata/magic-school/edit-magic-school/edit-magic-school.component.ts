import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_MagicSchool } from 'src/app/admin/models/sourcedata/dto_sourcedata_magicschool';
import { SourceData_MagicSchool } from 'src/app/admin/models/sourcedata/sourcedata_magicschool';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $:any;

@Component({
  selector: 'app-edit-magic-school',
  templateUrl: './edit-magic-school.component.html',
  styleUrls: ['./edit-magic-school.component.scss']
})
export class EditMagicSchoolComponent implements OnInit, AfterViewInit {

  public editMagicSchoolForm: FormGroup;
  public isSubmitted = false;
  public magicSchool: SourceData_MagicSchool;
  public sources: [SourceData_Source];
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editMagicSchoolForm = this._formBuilder.group({
      id: [this.magicSchool.id],
      name: [this.magicSchool.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.magicSchool.description, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [this.magicSchool.source.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editMagicSchoolForm.controls[controlName].invalid && (this.editMagicSchoolForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editMagicSchoolForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Magic School
  public editMagicSchool = (editMagicSchoolValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editMagicSchoolForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editMagicSchoolValue };

    // Create instance of Magic School model
    const magicSchool: DTO_SourceData_MagicSchool = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 3
    }

    // Create Magic School in API
    this._sourcedataService.updateMagicSchool(magicSchool)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
