import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HeaderComponent } from './header/header.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ModalProjectModule } from './modal-project/modal.project.module';


@NgModule({
  declarations: [
    NavigationBarComponent,
    HeaderComponent,
    ProjectCardComponent,
    
  ],
  imports: [
    CommonModule,
    ModalProjectModule

  ],
  exports: [
    NavigationBarComponent,
    HeaderComponent,
    ProjectCardComponent,
    ModalProjectModule
  ]
})
export class GlobalComponentsModule { }
