import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sourcedata',
  templateUrl: './sourcedata.component.html',
  styleUrls: ['./sourcedata.component.scss']
})
export class SourcedataComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  // Sidebar toggling event handler
  // Uses JQuery to add the 'toggled' class to the sidebar element
  public toggleSidebar = (event: Event) => {
    event.preventDefault();
    $("#sidebar-wrapper").toggleClass("toggled");
    $("#sidebar-toggler-icon-md-collapsed").toggleClass("d-none");
    $("#sidebar-toggler-icon-md-expanded").toggleClass("d-none");
    $("#sidebar-toggler-icon-sm-collapsed").toggleClass("d-none");
    $("#sidebar-toggler-icon-sm-expanded").toggleClass("d-none");
  }

}
