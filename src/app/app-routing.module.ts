import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './module/home/pages/home/home.component';
import { LoginComponent } from './module/auth/pages/login/login.component';
import { LogoutComponent } from './module/auth/pages/logout/logout.component';
import { AuthGuard } from './module/auth/guards/auth.guard';
import { ProfileComponent } from './module/home/pages/profile/profile.component';
import { DashboardComponent } from './module/home/pages/dashboard/dashboard.component';
import { ShopComponent } from './module/home/pages/shop/shop.component';
import { CreateShopComponent } from './module/home/pages/shop/create-shop/create-shop.component';
import { ShipmentsComponent } from './module/home/pages/shipments/shipments.component';
import { TransactionsComponent } from './module/home/pages/transactions/transactions.component';
import { PurchaseComponent } from './module/home/pages/purchase/purchase.component';
import { SinglePurchaseComponent } from './module/home/pages/single-purchase/single-purchase.component';
import { SingleSaleComponent } from './module/home/pages/single-sale/single-sale.component';
import { SalesComponent } from './module/home/pages/sales/sales.component';
import { ProductsComponent } from './module/home/pages/products/products.component';
import { CreateProductComponent } from './module/home/pages/products/create-product/create-product.component';
import { SingleComponent } from './module/home/pages/single/single.component';
import { StoreprofileComponent } from './module/home/pages/store/storeprofile/storeprofile.component';
import { CarComponent } from './module/home/pages/car/car.component';
import { CheckoutComponent } from './module/home/pages/checkout/checkout.component';
import { PaymentComponent } from './module/home/pages/payment/payment.component';
import { ThankYouComponent } from './module/home/pages/thank-you/thank-you.component';
import { ErrorPaymentComponent } from './module/home/pages/error-payment/error-payment.component';
import { SingleBlogComponent } from './module/home/pages/single-blog/single-blog.component';
import {SearchPageComponent} from './module/home/pages/search-page/search-page.component';
import {SearchPageCategoryComponent} from './module/home/pages/search-page-category/search-page-category.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: {
    }
  },
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
    path: 'logout',
    component: LogoutComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    }
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    }
  },
  {
    path: 'shop/edit/:id',
    component: CreateShopComponent,
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    }
  },
  {
    path: 'single/:id',
    component: SingleComponent,
    pathMatch: 'full'
  },
  {
    path: 'search/:src',
    component: SearchPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'category/:id',
    component: SearchPageCategoryComponent,
    pathMatch: 'full'
  },
  {
    path: 'blog/:id/:slug',
    component: SingleBlogComponent,
    pathMatch: 'full',
  },
  {
    path: 'shop/create',
    component: CreateShopComponent,
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    }
  },
  {
    path: 'shipments',
    component: ShipmentsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true
    },
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true
    },
  },
  {
    path: 'purchases',
    component: PurchaseComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    },
  },
  {
    path: 'payment',
    component: PaymentComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
      fullMenu: true
    },
  },
  {
    path: 'thank-you/:uuid',
    component: ThankYouComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      footer: true,
    },
  },
  {
    path: 'error-payment/:uuid',
    component: ErrorPaymentComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      footer: true
    },
  },
  {
    path: 'products',
    component: ProductsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    },
  },
  {
    path: 'products/create',
    component: CreateProductComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    },
  },
  {
    path: 'products/edit/:id',
    component: CreateProductComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    },
  },
  {
    path: 'products/edit/:id/:step',
    component: CreateProductComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    },
  },
  {
    path: 'sales',
    component: SalesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    },
  },
  {
    path: 'purchases/:id',
    component: SinglePurchaseComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    },
  },
  {
    path: 'sales/:id',
    component: SingleSaleComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
    },
  },
  {
    path: 'shopping-cart',
    component: CarComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
      fullMenu: true
    },
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      subMenu: true,
      footer: true,
      fullMenu: true
    },
  },
  {
    path: 'store/:id',
    component: StoreprofileComponent,
    pathMatch: 'full',
    data: {
      footer: true,
    }
  },
  { path: '**', component: HomeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
