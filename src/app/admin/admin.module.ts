import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcedataComponent } from './components/sourcedata/sourcedata.component';
import { AbilityscoreComponent } from './components/sourcedata/basedata/abilityscore/abilityscore.component';
import { ConditionComponent } from './components/sourcedata/basedata/condition/condition.component';
import { SourceComponent } from './components/sourcedata/source/source.component';
import { AddSourceComponent } from './components/sourcedata/source/add-source/add-source.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditSourceComponent } from './components/sourcedata/source/edit-source/edit-source.component';
import { DeleteSourceComponent } from './components/sourcedata/source/delete-source/delete-source.component';



@NgModule({
  declarations: [SourcedataComponent, AbilityscoreComponent, ConditionComponent, SourceComponent, AddSourceComponent, EditSourceComponent, DeleteSourceComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'sourcedata', component: SourcedataComponent,
        children: [
          { path: 'abilityscore', component: AbilityscoreComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'condition', component: ConditionComponent, outlet: 'admin-sourcedata-outlet' },
          { path: 'source', component: SourceComponent, outlet: 'admin-sourcedata-outlet' }
        ]}
    ])
  ]
})
export class AdminModule { }
