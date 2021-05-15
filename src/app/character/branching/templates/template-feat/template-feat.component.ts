import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { Branching_Feat } from 'src/app/admin/models/branching/branching_feat';
import { DTO_NewCharacter } from 'src/app/character/models/dto-newcharacter';
import { DTO_NewCharacter_Feat } from 'src/app/character/models/dto_newcharacter_feat';
import { ClassIdentifiers } from 'src/app/enums/class-identifier.enum';
import { TemplateSelectionModalComponent } from '../template-selection-modal/template-selection-modal.component';

@Component({
  selector: 'character-branching-template-feat',
  templateUrl: './template-feat.component.html',
  styleUrls: ['./template-feat.component.scss']
})
export class TemplateFeatComponent implements OnInit, AfterViewInit {

  @Input() choice: Branching_Choice<object, Branching_Feat>;
  @Input() characterModel: DTO_NewCharacter;
  @Input() rootId: string;
  @Input() parentLevel: number;
  @Output() validationChanged = new EventEmitter<boolean>();

  selectedFeat: Branching_Feat;
  featModel: DTO_NewCharacter_Feat;
  
  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static",
    size: "sm"
  }

  constructor(private _modalService: NgbModal, private _changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    // Manually trigger change detection on view elements to check if classes have been changed through triggered validation of child elements
    // Not doing this causes an ExpressionChangedAfterItHasBeenCheckedError
    this._changeDetector.detectChanges();
  }

  ngOnInit(): void {
    if (this.choice.options.length === 1) {
      // Automatically select the only option in the list
      this.selectedFeat = this.choice.options[0];

      // Add selection to character model
      this.addSelectionToCharacterModel();

      // Validate choice
      this.onValidationChanged();

      // Trigger validationChanged event
      this.validationChanged.emit(this.choice.isValid);
    }
  }

  selectFeat = () => {
    // Remove current choice from character model
    if (this.selectedFeat) {
      this.removeExistingFeat();
    }

    // Open modal
    const modalRef = this._modalService.open(TemplateSelectionModalComponent, this.options);
    modalRef.componentInstance.options = this.choice.options;
    modalRef.componentInstance.title = "Select Feat";
    modalRef.componentInstance.selection = this.selectedFeat;

    // Await modal response
    modalRef.result.then(data => {
      // Update selection
      this.selectedFeat = data;

      // Add selection to character model
      this.addSelectionToCharacterModel();

      // Validate object
      this.onValidationChanged();
      this._changeDetector.detectChanges();

      // Trigger validationChanged event
      this.validationChanged.emit(this.choice.isValid);
    },
    error => {
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    })
  }

  onValidationChanged = () => {
    // Validate entire object and update choice based on result
    this.choice.isValid = this.validateObject();

    // Trigger validationChanged event
    this.validationChanged.emit(this.choice.isValid);
  }

  private validateObject = (): boolean => {
    let result = false;
    
    // Check if a feat option is selected. If not, the feat is invalid by default
    if (this.selectedFeat !== undefined){
      // Initialize result as "true". If one of the children is not valid, the result will be false, regardless of state of other children
      result = true;

      // Validate attached modifier choices
      if (this.selectedFeat.modifiers.some(x => x.isValid !== true)) { // Check against "not true", state may be "undefined" instead of "false"
        // At least one nested modifier is invalid, invalidate object
        result = false;
      }

      // Validate attached subfeat choices
      if (this.selectedFeat.subFeats?.some(x => x.isValid !== true)) { // Check against "not true", state may be "undefined" instead of "false"
        // At least one nested feat is invalid, invalidate object
        result = false;
      }

      // Validate attached ability choices
      if (this.selectedFeat.abilities?.some(x => x.isValid !== true)) { // Check against "not true", state may be "undefined" instead of "false"
        // At least one nested ability is invalid, invalidate object
        result = false;
      }
    }

    return result;
  }

  private addSelectionToCharacterModel = () => {
    // Detect the feat's parent based on the identifier in the choice's parentID
    switch (this.choice.parentId.substring(0, this.choice.parentId.indexOf('-'))) {
      case ClassIdentifiers.RACE:
        // Race detected, add feat to list
        this.addFeatToRace();
        break;
      case ClassIdentifiers.CLASS:
        // To be implemented
        break;
      case ClassIdentifiers.FEAT:
        // Feat detected, add subfeat to list
        this.addSubFeatToFeat();
        break;
    }
  }

  private addFeatToRace = () => {
    // Create Feat object
    this.featModel = new DTO_NewCharacter_Feat(this.selectedFeat.id, this.choice.level, this.rootId);

    // Get race from character model
    let race = this.characterModel.races.find(x => x.id === this.rootId);

    // Add feat to race
    race.feats.push(this.featModel);
  }

  private addSubFeatToFeat = () => {
    // Create Feat object
    this.featModel = new DTO_NewCharacter_Feat(this.selectedFeat.id, this.choice.level, this.rootId, this.choice.parentId);

    // Get race from character model
    let race = this.characterModel.races.find(x => x.id === this.rootId);

    // Get feat from race
    let feat = race.feats.find(x => x.id === this.choice.parentId && x.level === this.parentLevel);

    // Add subfeat to feat
    feat.subFeats.push(this.featModel);
  }

  private removeExistingFeat = () => {
    // Detect the feat's parent based on the identifier in the choice's parentID
    switch (this.choice.parentId.substring(0, this.choice.parentId.indexOf('-'))) {
      case ClassIdentifiers.RACE:
        // Race detected, remove feat from list
        this.removeFeatFromRace();
        break;
      case ClassIdentifiers.CLASS:
        // To be implemented
        break;
      case ClassIdentifiers.FEAT:
        // Feat detected, remove subfeat from list
        this.removeSubFeatFromFeat();
        break;
    }

    // Clear feat model
    this.featModel = null;
  }

  private removeFeatFromRace = () => {
    // Get race from character
    let race = this.characterModel.races.find(x => x.id === this.rootId);

    // Remove feat from race
    let index = race.feats.findIndex(x => x.id === this.selectedFeat.id && x.level === this.choice.level);
    race.feats.splice(index, 1);
  }

  private removeSubFeatFromFeat = () => {
    // Get race from character
    let race = this.characterModel.races.find(x => x.id === this.rootId);

    // Get feat from race
    let feat = race.feats.find(x => x.id === this.choice.parentId && x.level === this.parentLevel);

    // Remove subfeat from feat
    let index = feat.subFeats.findIndex(x => x.id === this.selectedFeat.id && x.level === this.choice.level);
    feat.subFeats.splice(index, 1);
  }
}
