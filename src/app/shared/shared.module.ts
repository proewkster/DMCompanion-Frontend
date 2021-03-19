import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';



@NgModule({
  declarations: [ForbiddenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'forbidden', component: ForbiddenComponent }
    ])
  ],
  exports: [
  ]
})
export class SharedModule { }
