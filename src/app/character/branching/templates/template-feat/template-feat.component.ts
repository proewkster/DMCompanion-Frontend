import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Branching_Choice } from 'src/app/admin/models/branching/branching_choice';
import { Branching_Feat } from 'src/app/admin/models/branching/branching_feat';
import { TemplateSelectionModalComponent } from '../template-selection-modal/template-selection-modal.component';

@Component({
  selector: 'character-branching-template-feat',
  templateUrl: './template-feat.component.html',
  styleUrls: ['./template-feat.component.scss']
})
export class TemplateFeatComponent implements OnInit, AfterViewInit {

  @Input() choice: Branching_Choice<object, Branching_Feat>;

  selectedFeat: Branching_Feat;
  
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

      // Validate choice
      this.onValidationChanged();
    }
  }

  selectFeat = () => {
    // Open modal
    const modalRef = this._modalService.open(TemplateSelectionModalComponent, this.options);
    modalRef.componentInstance.options = this.choice.options;
    modalRef.componentInstance.title = "Select Feat";
    modalRef.componentInstance.selection = this.selectedFeat;

    // Await modal response
    modalRef.result.then(data => {
      // Update selection
      this.selectedFeat = data;

      // Validate object
      this.onValidationChanged();
      this._changeDetector.detectChanges();
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
    }

    return result;
  }
}
