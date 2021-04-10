import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DTO_SourceData_Feat } from 'src/app/admin/models/sourcedata/dto_sourcedata_feat';
import { SourceData_Feat } from 'src/app/admin/models/sourcedata/sourcedata_feat';
import { SourceData_Source } from 'src/app/admin/models/sourcedata/sourcedata_source';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';
import { FeatType } from 'src/app/enums/feat-type.enum';

declare var $: any;

@Component({
  selector: 'app-add-feat',
  templateUrl: './add-feat.component.html',
  styleUrls: ['./add-feat.component.scss']
})
export class AddFeatComponent implements OnInit, AfterViewInit {

  public addFeatForm: FormGroup;
  public isSubmitted = false;
  public feat: SourceData_Feat;
  public sources: [SourceData_Source];
  public featTypes = FeatType;
  public keys = Object.keys;
  public title: string;

  constructor(private _formBuilder: FormBuilder, private _sourcedataService: SourcedataService, private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {

    // Designate form and configure validation
    this.addFeatForm = this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.maxLength(1000)]],
      type: [null, [Validators.required]],
      stacking: [null],
      sourceId: [null, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.addFeatForm.controls[controlName].invalid && (this.addFeatForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addFeatForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Feat
  public createFeat = (addFeatValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.addFeatForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...addFeatValue };

    // Create instance of Feat model
    const feat: DTO_SourceData_Feat = {
      name: formValues.name,
      description: formValues.description,
      type: formValues.type,
      stacking: formValues.stacking,
      sourceId: formValues.sourceId
    }

    // Create Feat in API
    this._sourcedataService.createFeat(feat)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
