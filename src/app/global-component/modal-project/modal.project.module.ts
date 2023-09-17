import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

//pipes
import { SharedPipesModule } from '@pipes/shared-pipes.module';

//NgxSkeletonLoaderModule
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

//Modal
import { ModalProjectComponent } from './modal-project.component';



@NgModule({
  declarations: [ModalProjectComponent],
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    SharedPipesModule,
    NgxSkeletonLoaderModule
  ],
  exports: [ModalProjectComponent]
})
export class ModalProjectModule { }
