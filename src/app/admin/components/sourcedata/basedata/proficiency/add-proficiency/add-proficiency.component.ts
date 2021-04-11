import { DTO_SourceData_Proficiency } from './../../../../../models/sourcedata/dto_sourcedata_proficiency';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { ProficiencyType } from 'src/app/enums/proficiency-type.enum';

declare var $: any;

@Component({
  selector: 'app-add-proficiency',
  templateUrl: './add-proficiency.component.html',
  styleUrls: ['./add-proficiency.component.scss']
})
export class AddProficiencyComponent implements OnInit, AfterViewInit {

  public addProficiencyForm: FormGroup;
  public sources: [SourceData_Source];
  public proficiencyTypes = ProficiencyType;
  public keys = Object.keys;
  public title: string;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addProficiencyForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      type: [null, [Validators.required]],
      description: [null, [Validators.maxLength(1000)]],
      sourceId: [null, Validators.required]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addProficiencyForm.controls[controlName].invalid && (this.addProficiencyForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addProficiencyForm.controls[controlName].hasError(errorName);
  }

  // Submit new Proficiency
  public createProficiency = (addProficiencyValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addProficiencyForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addProficiencyValue };

    // Create instance of Proficiency model
    const proficiency: DTO_SourceData_Proficiency = {
      type: formValues.type,
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 4
    }

    // Create Proficiency in API
    this._sourcedataService.createProficiency(proficiency)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
