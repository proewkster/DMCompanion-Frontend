import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Ability } from 'src/app/admin/models/sourcedata/sourcedata_ability';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-ability',
  templateUrl: './delete-ability.component.html',
  styleUrls: ['./delete-ability.component.scss']
})
export class DeleteAbilityComponent implements OnInit {

  ability: SourceData_Ability;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteAbility = () => {
    // Delete Ability from database
    this._sourcedataService.deleteAbility(this.ability.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
