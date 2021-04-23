import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Spell } from 'src/app/admin/models/sourcedata/sourcedata_spell';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-spell',
  templateUrl: './delete-spell.component.html',
  styleUrls: ['./delete-spell.component.scss']
})
export class DeleteSpellComponent implements OnInit {

  spell: SourceData_Spell;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteSpell = () => {
    // Delete Spell from database
    this._sourcedataService.deleteSpell(this.spell.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}