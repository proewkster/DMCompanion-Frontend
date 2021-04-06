import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Proficiency } from 'src/app/admin/models/sourcedata/dto_sourcedata_proficiency';
import { SourceData_Proficiency } from 'src/app/admin/models/sourcedata/sourcedata_proficiency';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { ProficiencyType } from 'src/app/enums/proficiency-type.enum';

declare var $: any;

@Component({
  selector: 'app-edit-proficiency',
  templateUrl: './edit-proficiency.component.html',
  styleUrls: ['./edit-proficiency.component.scss']
})
export class EditProficiencyComponent implements OnInit, AfterViewInit {

  public editProficiencyForm: FormGroup;
  public isSubmitted = false;
  public proficiency: SourceData_Proficiency;
  public sources: [SourceData_Source];
  public proficiencyTypes = ProficiencyType;
  public keys = Object.keys;
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editProficiencyForm = this._formBuilder.group({
      id: [this.proficiency.id],
      type: [this.proficiency.type, [Validators.required]],
      name: [this.proficiency.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.proficiency.description, [Validators.maxLength(1000)]],
      sourceId: [this.proficiency.source.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editProficiencyForm.controls[controlName].invalid && (this.editProficiencyForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editProficiencyForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Proficiency
  public editProficiency = (editProficiencyValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editProficiencyForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editProficiencyValue };

    // Create instance of Proficiency model
    const proficiency: DTO_SourceData_Proficiency = {
      id: formValues.id,
      type: formValues.type,
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 4
    }

    // Create Proficiency in API
    this._sourcedataService.updateProficiency(proficiency)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
