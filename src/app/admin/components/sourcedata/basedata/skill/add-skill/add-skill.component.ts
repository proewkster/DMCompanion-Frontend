import { DTO_SourceData_Skill } from './../../../../../models/sourcedata/dto_sourcedata_skill';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/sourcedata_abilityscore';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit, AfterViewInit {

  public addSkillForm: FormGroup;
  public sources: [SourceData_Source];
  public abilityScores: [SourceData_AbilityScore];
  public title: string;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addSkillForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [null, Validators.required],
      abilityScoreId: [null, Validators.required]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addSkillForm.controls[controlName].invalid && (this.addSkillForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addSkillForm.controls[controlName].hasError(errorName);
  }

  // Submit new Skill
  public createSkill = (addSkillValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addSkillForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addSkillValue };

    // Create instance of Skill model
    const skill: DTO_SourceData_Skill = {
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      AbilityScoreId: formValues.abilityScoreId,
      discriminator: 6
    }

    // Create Skill in API
    this._sourcedataService.createSkill(skill)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
