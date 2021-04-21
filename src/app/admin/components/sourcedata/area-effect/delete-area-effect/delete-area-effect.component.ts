import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SourceData_AreaEffect } from 'src/app/admin/models/sourcedata/sourcedata_areaeffect';

@Component({
  selector: 'app-delete-area-effect',
  templateUrl: './delete-area-effect.component.html',
  styleUrls: ['./delete-area-effect.component.scss']
})
export class DeleteAreaEffectComponent implements OnInit {

  areaEffect: SourceData_AreaEffect;
  title: string;

  constructor(private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public deleteAreaEffect = () => {
    // Close model correctly, indicating to calling instance that area effect object can be removed
    this._activeModal.close(this.areaEffect);
  }
}