import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { TimeagoModule, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter } from 'ngx-timeago';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './module/home/pages/home/home.component';
import {HeaderComponent} from './module/home/components/header/header.component';
import {FooterComponent} from './module/home/components/footer/footer.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { NgxStarsModule } from 'ngx-stars';
import {OwlModule} from 'ngx-owl-carousel';
import {RestService} from './shared/services/rest.service';
import {UtilsService} from './shared/services/util.service';
import {LoginComponent} from './module/auth/pages/login/login.component';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BannerComponent} from './module/home/pages/home/banner/banner.component';
import {BoxCategoriesComponent} from './module/home/pages/home/box-categories/box-categories.component';
import {BoxFeaturedProductComponent} from './module/home/pages/home/box-featured-product/box-featured-product.component';
import {BoxShopsComponent} from './module/home/pages/home/box-shops/box-shops.component';
import {ZipLocationComponent} from './module/home/components/zip-location/zip-location.component';
import {BoxInfoComponent} from './module/home/pages/home/box-info/box-info.component';
import {BoxBlogComponent} from './module/home/pages/home/box-blog/box-blog.component';
import {BoxNewsComponent} from './module/home/pages/home/box-news/box-news.component';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import { MiniGalleryProductComponent } from './module/home/pages/home/mini-gallery-product/mini-gallery-product.component';
import { NgxGalleryModule } from 'ngx-gallery';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1092864856036-fjv9roa0ktkm98sld5t755maa4qcokh1.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('351091138867106')
  }
]);

export function provideConfig() {
  return config;
}

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
  }
  
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    BannerComponent,
    BoxCategoriesComponent,
    BoxFeaturedProductComponent,
    BoxShopsComponent,
    ZipLocationComponent,
    BoxInfoComponent,
    BoxBlogComponent,
    BoxNewsComponent,
    MiniGalleryProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGalleryModule,
    AngularFontAwesomeModule,
    OwlModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule,
    NgxStarsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    })
  ],

  providers: [
    RestService,
    UtilsService,
    BsModalService,
    BsModalRef,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }

  ],
  entryComponents: [
    ZipLocationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
