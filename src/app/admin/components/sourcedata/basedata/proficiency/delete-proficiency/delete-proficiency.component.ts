import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_Proficiency } from 'src/app/admin/models/sourcedata/sourcedata_proficiency';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-proficiency',
  templateUrl: './delete-proficiency.component.html',
  styleUrls: ['./delete-proficiency.component.scss']
})
export class DeleteProficiencyComponent implements OnInit {

  proficiency: SourceData_Proficiency;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteProficiency = () => {
    // Delete Proficiency from database
    this._sourcedataService.deleteProficiency(this.proficiency.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
