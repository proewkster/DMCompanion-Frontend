import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_SpellDamage } from 'src/app/admin/models/sourcedata/sourcedata_spelldamage';

@Component({
  selector: 'app-delete-spell-damage',
  templateUrl: './delete-spell-damage.component.html',
  styleUrls: ['./delete-spell-damage.component.scss']
})
export class DeleteSpellDamageComponent implements OnInit {

  damage: SourceData_SpellDamage;
  title: string;

  constructor(private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public deleteDamage = () => {
    // Close model correctly, indicating to calling instance that damage object can be removed
    this._activeModal.close(this.damage);
  }
}