import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Skill } from 'src/app/admin/models/sourcedata/dto_sourcedata_skill';
import { SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/sourcedata_abilityscore';
import { SourceData_Skill } from 'src/app/admin/models/sourcedata/sourcedata_skill';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent implements OnInit, AfterViewInit {

  public editSkillForm: FormGroup;
  public isSubmitted = false;
  public skill: SourceData_Skill;
  public sources: [SourceData_Source];
  public abilityScores: [SourceData_AbilityScore];
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editSkillForm = this._formBuilder.group({
      id: [this.skill.id],
      name: [this.skill.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.skill.description, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [this.skill.source.id, [Validators.required]],
      abilityScoreId: [this.skill.abilityScore.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editSkillForm.controls[controlName].invalid && (this.editSkillForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editSkillForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Skill
  public editSkill = (editSkillValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editSkillForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editSkillValue };

    // Create instance of Skill model
    const skill: DTO_SourceData_Skill = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      sourceId: formValues.sourceId,
      AbilityScoreId: formValues.abilityScoreId,
      discriminator: 6
    }

    // Create Skill in API
    this._sourcedataService.updateSkill(skill)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
