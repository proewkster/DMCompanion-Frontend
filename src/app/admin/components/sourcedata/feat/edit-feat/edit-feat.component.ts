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
  selector: 'app-edit-feat',
  templateUrl: './edit-feat.component.html',
  styleUrls: ['./edit-feat.component.scss']
})
export class EditFeatComponent implements OnInit, AfterViewInit {

  public editFeatForm: FormGroup;
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
    this.editFeatForm = this._formBuilder.group({
      id: [this.feat.id],
      name: [this.feat.name, [Validators.required, Validators.maxLength(100)]],
      description: [this.feat.description, [Validators.required, Validators.maxLength(1000)]],
      type: [this.feat.type, [Validators.required]],
      stacking: [this.feat.stacking],
      sourceId: [this.feat.source.id, [Validators.required]]
    });
  }

  // Methods for validation
  public validateControl = (controlName: string) => {
    return this.editFeatForm.controls[controlName].invalid && (this.editFeatForm.controls[controlName].touched || this.isSubmitted);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editFeatForm.controls[controlName].hasError(errorName);
  }

  // Submit updated Feat
  public editFeat = (editFeatValue) => {
    
    // Initialize properties
    this.isSubmitted = true;

    // Stop if form is invalid
    if (this.editFeatForm.invalid) {
      return;
    }

    // Get form values
    const formValues = { ...editFeatValue };

    // Create instance of Feat model
    const feat: DTO_SourceData_Feat = {
      id: formValues.id,
      name: formValues.name,
      description: formValues.description,
      type: formValues.type,
      stacking: formValues.stacking,
      sourceId: formValues.sourceId
    }

    // Create Feat in API
    this._sourcedataService.updateFeat(feat)
      .subscribe(data => {
        this._activeModal.close(data);
      },
      error => {
        this._activeModal.close(error);
      });
  }
}
