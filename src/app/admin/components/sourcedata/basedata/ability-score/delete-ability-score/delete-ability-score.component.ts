import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_AbilityScore } from 'src/app/admin/models/sourcedata/sourcedata_abilityscore';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-ability-score',
  templateUrl: './delete-ability-score.component.html',
  styleUrls: ['./delete-ability-score.component.scss']
})
export class DeleteAbilityScoreComponent implements OnInit {

  abilityScore: SourceData_AbilityScore
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteAbilityScore = () => {
    // Delete source from database
    this._sourcedataService.deleteAbilityScore(this.abilityScore.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
