import { Branching_CastSpell } from './../../../../admin/models/branching/branching_castspell';
import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Branching_Ability } from 'src/app/admin/models/branching/branching_ability';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { TemplateSelectionModalComponent } from '../template-selection-modal/template-selection-modal.component';
import { ClassIdentifiers } from 'src/app/enums/class-identifier.enum';
import { DTO_NewCharacter_Ability } from 'src/app/character/models/dto_newcharacter_ability';
import { DTO_NewCharacter } from 'src/app/character/models/dto-newcharacter';

@Component({
  selector: 'character-branching-template-ability',
  templateUrl: './template-ability.component.html',
  styleUrls: ['./template-ability.component.scss']
})
export class TemplateAbilityComponent implements OnInit, AfterViewInit {

  @Input() choice: Branching_Choice<object, Branching_Ability>;
  @Input() characterModel: DTO_NewCharacter;
  @Input() rootId: string;
  @Input() parentLevel: number;
  @Output() validationChanged = new EventEmitter<boolean>();

  selectedAbility: Branching_Ability;
  abilityModel: DTO_NewCharacter_Ability;
  
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
      this.selectedAbility = this.choice.options[0];

      // Add selection to character model
      this.addSelectionToCharacterModel();

      // Validate choice
      this.onValidationChanged();

      // Trigger validationChanged event
      this.validationChanged.emit(this.choice.isValid);
    }
  }

  selectAbility = () => {
    // Remove current choice from character model
    if (this.selectedAbility) {
      this.removeExistingAbility();
    }

    // Open modal
    const modalRef = this._modalService.open(TemplateSelectionModalComponent, this.options);
    modalRef.componentInstance.options = this.choice.options;
    modalRef.componentInstance.title = "Select Ability";
    modalRef.componentInstance.selection = this.selectedAbility;

    // Await modal response
    modalRef.result.then(data => {
      // Update selection
      this.selectedAbility = data;

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
    
    // Check if a ability option is selected. If not, the ability is invalid by default
    if (this.selectedAbility !== undefined){
      // Initialize result as "true". If one of the children is not valid, the result will be false, regardless of state of other children
      result = true;

      // Validate attached modifier choices
      if (this.selectedAbility.modifiers.some(x => x.isValid !== true)) { // Check against "not true", state may be "undefined" instead of "false"
        // At least one nested modifier is invalid, invalidate object
        result = false;
      }

      // Validate attached spell choices
      if ((this.selectedAbility as Branching_CastSpell).spells?.some(x => x.isValid !== true)) { // Check against "not true", state may be "undefined" instead of "false"
        // At least one nested spell is invalid, invalidate object
        result = false;
      }
    }

    return result;
  }

  private addSelectionToCharacterModel = () => {
    // Detect the ability's parent based on the identifier in the choice's parentID
    switch (this.choice.parentId.substring(0, this.choice.parentId.indexOf('-'))) {
      case ClassIdentifiers.RACE:
        // Race detected, add ability to list
        this.addAbilityToRace();
        break;
      case ClassIdentifiers.CLASS:
        // To be implemented
        break;
      case ClassIdentifiers.FEAT:
        // Feat detected, add ability to list
        this.addAbilityToFeat();
        break;
    }
  }

  private addAbilityToRace = () => {
    // Create Ability object
    this.abilityModel = new DTO_NewCharacter_Ability(this.selectedAbility.id, this.choice.level, this.rootId);

    // Get race from character model
    let race = this.characterModel.races.find(x => x.id === this.rootId);

    // Add ability to race
    race.abilities.push(this.abilityModel);
  }

  private addAbilityToFeat = () => {
    // Create Ability object
    this.abilityModel = new DTO_NewCharacter_Ability(this.selectedAbility.id, this.choice.level, this.rootId, this.choice.parentId);

    // Get race from character model
    let race = this.characterModel.races.find(x => x.id === this.rootId);

    // Get ability from race
    let feat = race.feats.find(x => x.id === this.choice.parentId && x.level === this.parentLevel);

    // Add ability to feat
    feat.abilities.push(this.abilityModel);
  }

  private removeExistingAbility = () => {
    // Detect the ability's parent based on the identifier in the choice's parentID
    switch (this.choice.parentId.substring(0, this.choice.parentId.indexOf('-'))) {
      case ClassIdentifiers.RACE:
        // Race detected, remove ability from list
        this.removeAbilityFromRace();
        break;
      case ClassIdentifiers.CLASS:
        // To be implemented
        break;
      case ClassIdentifiers.FEAT:
        // Feat detected, remove ability from list
        this.removeAbilityFromFeat();
        break;
    }

    // Clear ability model
    this.abilityModel = null;
  }

  private removeAbilityFromRace = () => {
    // Get race from character
    let race = this.characterModel.races.find(x => x.id === this.rootId);

    // Remove ability from race
    let index = race.abilities.findIndex(x => x.id === this.selectedAbility.id && x.level === this.choice.level);
    race.abilities.splice(index, 1);
  }

  private removeAbilityFromFeat = () => {
    // Get race from character
    let race = this.characterModel.races.find(x => x.id === this.rootId);

    // Get feat from race
    let feat = race.feats.find(x => x.id === this.choice.parentId && x.level === this.parentLevel);

    // Remove ability from feat
    let index = feat.abilities.findIndex(x => x.id === this.selectedAbility.id && x.level === this.choice.level)
    feat.abilities.splice(index, 1);
  }
}
