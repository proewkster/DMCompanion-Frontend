import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_MeleeAttack } from 'src/app/admin/models/sourcedata/sourcedata_meleeattack';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-melee-attack',
  templateUrl: './delete-melee-attack.component.html',
  styleUrls: ['./delete-melee-attack.component.scss']
})
export class DeleteMeleeAttackComponent implements OnInit {

  meleeAttack: SourceData_MeleeAttack;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteMeleeAttack = () => {
    // Delete MeleeAttack from database
    this._sourcedataService.deleteMeleeAttack(this.meleeAttack.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}