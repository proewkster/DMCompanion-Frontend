import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { DTO_SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/dto_sourcedata_abilityscore';

declare var $: any;

@Component({
  selector: 'app-add-ability-score',
  templateUrl: './add-ability-score.component.html',
  styleUrls: ['./add-ability-score.component.scss']
})
export class AddAbilityScoreComponent implements OnInit, AfterViewInit {

  public addAbilityScoreForm: FormGroup;
  public sources: [SourceData_Source];
  public title: string;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addAbilityScoreForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [null, Validators.required]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addAbilityScoreForm.controls[controlName].invalid && (this.addAbilityScoreForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addAbilityScoreForm.controls[controlName].hasError(errorName);
  }

  // Submit new Abilty Score
  public createAbilityScore = (addAbilityScoreValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addAbilityScoreForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addAbilityScoreValue };

    // Create instance of Ability Score model
    const abilityScore: DTO_SourceData_AbilityScore = {
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 0
    }

    // Create source in API
    this._sourcedataService.createAbilityScore(abilityScore)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }

}
