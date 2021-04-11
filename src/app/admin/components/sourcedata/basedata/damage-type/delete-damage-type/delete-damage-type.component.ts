import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_DamageType } from 'src/app/admin/models/sourcedata/sourcedata_damagetype';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-damage-type',
  templateUrl: './delete-damage-type.component.html',
  styleUrls: ['./delete-damage-type.component.scss']
})
export class DeleteDamageTypeComponent implements OnInit {

  damageType: SourceData_DamageType;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteDamageType = () => {
    // Delete Damage Type from database
    this._sourcedataService.deleteDamageType(this.damageType.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
