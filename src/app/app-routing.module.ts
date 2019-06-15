import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './module/home/pages/home/home.component';
import { LoginComponent } from './module/auth/pages/login/login.component';
import { AuthGuard } from './module/auth/guards/auth.guard';
import { ProfileComponent } from './module/home/pages/profile/profile.component';
import { DashboardComponent } from './module/home/pages/dashboard/dashboard.component';
import { ShopComponent } from './module/home/pages/shop/shop.component';
import { CreateShopComponent } from './module/home/pages/shop/create-shop/create-shop.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    data: {
      header: true,
      footer: true
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true
    }
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true
    }
  },
  {
    path: 'shop/edit/:id',
    component: CreateShopComponent,
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true
    }
  },
  {
    path: 'shop/create',
    component: CreateShopComponent,
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true
    }
  },
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
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true
    }
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
