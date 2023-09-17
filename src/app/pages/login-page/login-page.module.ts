import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';


//BlockUIModule
import { BlockUIModule } from 'ng-block-ui';

//Global Components Module
import { GlobalComponentsModule } from '../../../app/global-component/global-components.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    BlockUIModule.forRoot(),
    GlobalComponentsModule
  ]
})
export class LoginPageModule { }
