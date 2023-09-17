import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { config } from '@helpers/config/config';

import { LoginPageComponent } from './login-page.component';

const routes: Routes = [{
  path: '',
  component: LoginPageComponent,
  children: [
    { path: '', loadChildren: () => import('./sections/login/login.module').then(m => m.LoginModule) },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule { }
