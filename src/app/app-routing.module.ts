import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { config } from './helpers/config/config';
import { AuthGuard } from '@helpers/guards/auth.guard';
import { ERoles } from './models/roles.model';

const routes: Routes = [
  { path: config.router.login, loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule) },
  {
    path: config.router.home, loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
    data: {
      role: [ERoles.ADMIN,ERoles.USER]
    }
  },
  {
    path: config.router.user_admin+"/"+config.router.user_admin_sub.project+ "/:id_project", loadChildren: () => import('./user-admin/user-admin.module').then(m => m.UserAdminModule),
    canActivate: [AuthGuard],
    data: {
      role: [ERoles.ADMIN]
    }

  },
  { path: '**', redirectTo: config.router.login },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
