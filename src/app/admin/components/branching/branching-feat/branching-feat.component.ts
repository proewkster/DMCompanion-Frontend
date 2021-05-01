import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Branching_Feat } from 'src/app/admin/models/branching/branching_feat';
import { BranchingService } from 'src/app/admin/services/branching.service';

declare var $: any;

@Component({
  selector: 'app-branching-feat',
  templateUrl: './branching-feat.component.html',
  styleUrls: ['./branching-feat.component.scss']
})
export class BranchingFeatComponent implements OnInit {

  public feats: Branching_Feat[];
  public selectedFeat: Branching_Feat;
  public loadingData: boolean;
  public loadingComplete: boolean;

  constructor(private _branchingService: BranchingService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getFeats();
  }

  private getFeats = () => {
    this._branchingService.getFeats().subscribe(data => {
      this.feats = data;

      // Refresh dropdown menu to display the options
      setTimeout(function() {
        $('.selectpicker').selectpicker('refresh');
      }, 1);
    },
    error => {
      console.log("An error occurred while retrieving data from the server");
    });
  }

  public onFeatSelection = (id: string) => {
    if (id !== "") {
      // Set loading parameters to display spinner
      this.loadingData = true;
      this.loadingComplete = false;

      // Get data for selected feat
      this._branchingService.getFeat(id).subscribe(data => {
        this.selectedFeat = data;

        // Set loading parameters to remove spinner and display tree for selected feat
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
    this._branchingService.updateFeat(this.selectedFeat).subscribe(data => {
      // Refresh selected item with data form database
      this.selectedFeat = data;

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
