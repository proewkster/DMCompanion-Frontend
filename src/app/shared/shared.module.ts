import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ModalComponent } from './components/modal/modal.component';
import { DynamicFormControlComponent } from './components/dynamic-forms/dynamic-form-control/dynamic-form-control.component';
import { DynamicFormComponent } from './components/dynamic-forms/dynamic-form/dynamic-form.component';



@NgModule({
  declarations: [ForbiddenComponent, ModalComponent,DynamicFormControlComponent, DynamicFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'forbidden', component: ForbiddenComponent }
    ])
  ],
  exports: [
    ModalComponent,
    DynamicFormControlComponent,
    DynamicFormComponent
  ]
})
export class SharedModule { }
