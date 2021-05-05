import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Branching_Feat } from 'src/app/admin/models/branching/branching_feat';
import { TemplateSelectionModalComponent } from '../template-selection-modal/template-selection-modal.component';

@Component({
  selector: 'character-branching-template-feat',
  templateUrl: './template-feat.component.html',
  styleUrls: ['./template-feat.component.scss']
})
export class TemplateFeatComponent implements OnInit {

  @Input() featOptions: Branching_Feat[];

  selectedFeat: Branching_Feat;
  
  private options: NgbModalOptions = {
    animation: true,
    centered: true,
    keyboard: true,
    backdrop: "static",
    size: "sm"
  }

  constructor(private _modalService: NgbModal) { }

  ngOnInit(): void {
  }

  selectFeat = () => {
    // Open modal
    const modalRef = this._modalService.open(TemplateSelectionModalComponent, this.options);
    modalRef.componentInstance.options = this.featOptions;
    modalRef.componentInstance.title = "Select Feat";
    modalRef.componentInstance.selection = this.selectedFeat;

    // Await modal response
    modalRef.result.then(data => {
      this.selectedFeat = data;
    },
    error => {
      if (error === "Close click" || error === "Cross click") {
        // Modal dismissed, no specific action
        // Error catch is needed to suppress errors in UI
      }
    })
  }

}
