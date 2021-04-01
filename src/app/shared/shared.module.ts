import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [ForbiddenComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'forbidden', component: ForbiddenComponent }
    ])
  ],
  exports: [
    ModalComponent
  ]
})
export class SharedModule { }
