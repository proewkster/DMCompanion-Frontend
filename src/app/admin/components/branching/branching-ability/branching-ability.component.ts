import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Branching_Ability } from 'src/app/admin/models/branching/branching_ability';
import { BranchingService } from 'src/app/admin/services/branching.service';

declare var $: any;

@Component({
  selector: 'app-branching-ability',
  templateUrl: './branching-ability.component.html',
  styleUrls: ['./branching-ability.component.scss']
})
export class BranchingAbilityComponent implements OnInit {

  public abilities: Branching_Ability[];
  public selectedAbility: Branching_Ability;
  public loadingData: boolean;
  public loadingComplete: boolean;

  constructor(private _branchingService: BranchingService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAbilities();
  }

  private getAbilities = () => {
    this._branchingService.getAbilities().subscribe(data => {
      this.abilities = data;

      // Refresh dropdown menu to display the options
      setTimeout(function() {
        $('.selectpicker').selectpicker('refresh');
      }, 1);
    },
    error => {
      console.log("An error occurred while retrieving data from the server");
    });
  }

  public onAbilitySelection = (id: string) => {
    if (id !== "") {
      // Set loading parameters to display spinner
      this.loadingData = true;
      this.loadingComplete = false;

      // Get data for selected ability
      this._branchingService.getAbility(id).subscribe(data => {
        this.selectedAbility = data;

        // Set loading parameters to remove spinner and display tree for selected ability
        this.loadingData = false;
        this.loadingComplete = true;
      })
    }
    else {
      // Nothing selected, remove all conditional content
      this.loadingData = false;
      this.loadingComplete = false;
    }
  }

  public saveChanges = () => {
    this._branchingService.updateAbility(this.selectedAbility).subscribe(data => {
      // Refresh selected item with data form database
      this.selectedAbility = data;

      // Display success message
      this._toastrService.success("Branch successfully saved");
    },
    error => {
      console.log(error);

      // Display error message
      this._toastrService.error("Branch could not be saved");
    });
  }
}
