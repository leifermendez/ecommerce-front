import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './module/home/pages/home/home.component';
import {LoginComponent} from './module/auth/pages/login/login.component';
import {AuthGuard} from './module/auth/guards/auth.guard';
import {ProfileComponent} from './module/home/pages/profile/profile.component';
import {DashboardComponent} from './module/home/pages/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   pathMatch: 'full',
  //   canLoad: [AuthGuard]
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
   {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
