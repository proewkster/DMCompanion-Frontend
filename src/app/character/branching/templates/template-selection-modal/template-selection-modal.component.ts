import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-template-selection-modal',
  templateUrl: './template-selection-modal.component.html',
  styleUrls: ['./template-selection-modal.component.scss']
})
export class TemplateSelectionModalComponent implements OnInit, AfterViewInit {

  options: any[] = [];
  title: string;

  selection: any;

  constructor(private _activeModal: NgbActiveModal) { }

  ngAfterViewInit(): void {
    $('.selectpicker').selectpicker();
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
    this._activeModal.close(this.selection);
  }

}
