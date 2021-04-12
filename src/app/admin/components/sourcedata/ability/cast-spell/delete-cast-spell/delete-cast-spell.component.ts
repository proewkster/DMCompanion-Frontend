import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_CastSpell } from 'src/app/admin/models/sourcedata/sourcedata_castspell';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-cast-spell',
  templateUrl: './delete-cast-spell.component.html',
  styleUrls: ['./delete-cast-spell.component.scss']
})
export class DeleteCastSpellComponent implements OnInit {

  castSpell: SourceData_CastSpell;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteCastSpell = () => {
    // Delete CastSpell from database
    this._sourcedataService.deleteCastSpell(this.castSpell.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}