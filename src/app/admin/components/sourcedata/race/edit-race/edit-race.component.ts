import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Race } from 'src/app/admin/models/sourcedata/dto_sourcedata_race';
import { SourceData_Race } from 'src/app/admin/models/sourcedata/sourcedata_race';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

declare var $: any;

@Component({
  selector: 'app-edit-race',
  templateUrl: './edit-race.component.html',
  styleUrls: ['./edit-race.component.scss']
})
export class EditRaceComponent implements OnInit, AfterViewInit {

  public editRaceForm: FormGroup;
  public isSubmitted = false;
  public race: SourceData_Race;
  public sources: [SourceData_Source];
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.editRaceForm = this._formBuilder.group({
      id: [this.race.id],
      name: [this.race.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.race.description, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [this.race.sourceId, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editRaceForm.controls[controlName].invalid && (this.editRaceForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editRaceForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Race
  public editRace = (editRaceValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editRaceForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editRaceValue };

    // Create instance of Speed model
    const race: DTO_SourceData_Race = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      type: this.race.type,
      parentId: this.race.parentId,
      sourceId: formValues.sourceId
    }

    // Create Race in API
    this._sourcedataService.updateRace(race)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
