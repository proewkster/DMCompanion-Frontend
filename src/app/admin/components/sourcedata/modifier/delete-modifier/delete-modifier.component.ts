import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Modifier } from 'src/app/admin/models/sourcedata/sourcedata_modifier';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-modifier',
  templateUrl: './delete-modifier.component.html',
  styleUrls: ['./delete-modifier.component.scss']
})
export class DeleteModifierComponent implements OnInit {

  modifier: SourceData_Modifier;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteModifier = () => {
    // Delete Modifier from database
    this._sourcedataService.deleteModifier(this.modifier.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
