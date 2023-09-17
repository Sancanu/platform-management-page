import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAdminRoutingModule } from './user-admin-routing.module';
import { UserAdminComponent } from './user-admin.component';
import { HomePageRoutingModule } from '@pages/home-page/home-page-routing.module';
import { GlobalComponentsModule } from '@components/global-components.module';


@NgModule({
  declarations: [
    UserAdminComponent
  ],
  imports: [
    CommonModule,
    GlobalComponentsModule,
    UserAdminRoutingModule
  ]
})
export class UserAdminModule { }
