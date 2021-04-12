import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_DamageType } from 'src/app/admin/models/sourcedata/sourcedata_damagetype';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-attack-damage',
  templateUrl: './delete-attack-damage.component.html',
  styleUrls: ['./delete-attack-damage.component.scss']
})
export class DeleteAttackDamageComponent implements OnInit {

  damage: SourceData_DamageType;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteDamage = () => {
    // Close model correctly, indicating to calling instance that damage object can be removed
    this._activeModal.close(this.damage);
  }
}