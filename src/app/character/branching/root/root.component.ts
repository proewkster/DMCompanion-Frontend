import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Branching_Race } from 'src/app/admin/models/branching/branching_race';
import { DTO_NewCharacter } from '../../models/dto-newcharacter';

@Component({
  selector: 'character-branching-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, AfterViewInit {

  @Input() race: Branching_Race;
  //@Input() class: Branching_Class; --> To be implemented
  @Input() characterModel: DTO_NewCharacter;
  @Output() validationChanged = new EventEmitter<boolean>();

  isValid = false;

  constructor(private _changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    // Manually trigger change detection on view elements to check if classes have been changed through triggered validation of child elements
    // Not doing this causes an ExpressionChangedAfterItHasBeenCheckedError
    this._changeDetector.detectChanges();
  }

  ngOnInit(): void {
  }

  onValidationChanged = () => {
    // Validate entire object and update choice based on result
    this.isValid = this.validateObject();
    
    // Trigger validationChanged event
    this.validationChanged.emit(this.isValid);
  }

  private validateObject = (): boolean => {
    let result = true;
    
    if (this.race) {
      // Race model is provided, validate race
      // Validate attached subfeat choices
      if (this.race.feats?.some(x => x.isValid !== true)) { // Check against "not true", state may be "undefined" instead of "false"
        // At least one nested feat is invalid, invalidate object
        result = false;
      }

      // Validate attached ability choices
      if (this.race.abilities?.some(x => x.isValid !== true)) { // Check against "not true", state may be "undefined" instead of "false"
        // At least one nested ability is invalid, invalidate object
        result = false;
      }
    }
    else {
      // Class model is provided, validate class
      // To be implemented
    }

    return result;
  }
}
