import { DTO_SourceData_Race } from './../../../../models/sourcedata/dto_sourcedata_race';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Race } from 'src/app/admin/models/sourcedata/sourcedata_race';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { RaceType } from 'src/app/enums/race-type.enum';
import { RequiredIfValue } from 'src/app/shared/validators/required-if-value';

declare var $: any;

@Component({
  selector: 'app-add-race',
  templateUrl: './add-race.component.html',
  styleUrls: ['./add-race.component.scss']
})
export class AddRaceComponent implements OnInit, AfterViewInit {

  public addRaceForm: FormGroup;
  public sources: [SourceData_Source];
  public parentRace: SourceData_Race;
  public raceType: string;
  public title: string;
  public isSubmitted = false;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addRaceForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      sourceId: [null, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addRaceForm.controls[controlName].invalid && (this.addRaceForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addRaceForm.controls[controlName].hasError(errorName);
  }

  // Submit new Race
  public createRace = (addRaceValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addRaceForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addRaceValue };

    // Create instance of Race model
    const race: DTO_SourceData_Race = {
      name: formValues.name,
      description: formValues.description,
      type: this.raceType,
      parentId: this.parentRace?.id,
      sourceId: formValues.sourceId
    }

    // Create Race in API
    this._sourcedataService.createRace(race)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
