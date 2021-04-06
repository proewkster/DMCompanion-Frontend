import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_MagicSchool } from 'src/app/admin/models/sourcedata/sourcedata_magicschool';
import { SourcedataService } from 'src/app/admin/services/sourcedata.service';

@Component({
  selector: 'app-delete-magic-school',
  templateUrl: './delete-magic-school.component.html',
  styleUrls: ['./delete-magic-school.component.scss']
})
export class DeleteMagicSchoolComponent implements OnInit {

  magicSchool: SourceData_MagicSchool;
  title: string;

  constructor(private _activeModal: NgbActiveModal, private _sourcedataService: SourcedataService) { }

  ngOnInit(): void {
  }

  public deleteMagicSchool = () => {
    // Delete Magic School from database
    this._sourcedataService.deleteMagicSchool(this.magicSchool.id)
      .subscribe(response => {
        this._activeModal.close(response);
      },
      error => {
        this._activeModal.close(error);
      }); 
  }
}
