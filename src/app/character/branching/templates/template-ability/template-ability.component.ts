import { Branching_CastSpell } from './../../../../admin/models/branching/branching_castspell';
import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Branching_Ability } from 'src/app/admin/models/branching/branching_ability';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { TemplateSelectionModalComponent } from '../template-selection-modal/template-selection-modal.component';

@Component({
  selector: 'character-branching-template-ability',
  templateUrl: './template-ability.component.html',
  styleUrls: ['./template-ability.component.scss']
})
export class TemplateAbilityComponent implements OnInit, AfterViewInit {

  @Input() choice: Branching_Choice<object, Branching_Ability>;
  @Output() validationChanged = new EventEmitter<boolean>();

  selectedAbility: Branching_Ability;
  
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

      // Validate choice
      this.onValidationChanged();

      // Trigger validationChanged event
      this.validationChanged.emit(this.choice.isValid);
    }
  }

  selectAbility = () => {
    // Open modal
    const modalRef = this._modalService.open(TemplateSelectionModalComponent, this.options);
    modalRef.componentInstance.options = this.choice.options;
    modalRef.componentInstance.title = "Select Ability";
    modalRef.componentInstance.selection = this.selectedAbility;

    // Await modal response
    modalRef.result.then(data => {
      // Update selection
      this.selectedAbility = data;

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
}
