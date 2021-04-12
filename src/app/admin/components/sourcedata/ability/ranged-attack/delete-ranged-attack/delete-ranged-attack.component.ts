import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_RangedAttack } from 'src/app/admin/models/sourcedata/sourcedata_rangedattack';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-ranged-attack',
  templateUrl: './delete-ranged-attack.component.html',
  styleUrls: ['./delete-ranged-attack.component.scss']
})
export class DeleteRangedAttackComponent implements OnInit {

  rangedAttack: SourceData_RangedAttack;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteRangedAttack = () => {
    // Delete RangedAttack from database
    this._sourcedataService.deleteRangedAttack(this.rangedAttack.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}