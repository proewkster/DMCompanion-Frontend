import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/dto_sourcedata_abilityscore';
import { SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/sourcedata_abilityscore';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-edit-ability-score',
  templateUrl: './edit-ability-score.component.html',
  styleUrls: ['./edit-ability-score.component.scss']
})
export class EditAbilityScoreComponent implements OnInit, AfterViewInit {

  public editAbilityScoreForm: FormGroup;
  public isSubmitted = false;
  public abilityScore: SourceData_AbilityScore;
  public sources: [SourceData_Source];
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editAbilityScoreForm = this._formBuilder.group({
      id: [this.abilityScore.id],
      name: [this.abilityScore.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.abilityScore.description, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [this.abilityScore.source.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editAbilityScoreForm.controls[controlName].invalid && (this.editAbilityScoreForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editAbilityScoreForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Source
  public editAbilityScore = (editAbilityScoreValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editAbilityScoreForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editAbilityScoreValue };

    // Create instance of Source model
    const abilityScore: DTO_SourceData_AbilityScore = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      discriminator: 0
    }

    // Create source in API
    this._sourcedataService.updateAbilityScore(abilityScore)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
