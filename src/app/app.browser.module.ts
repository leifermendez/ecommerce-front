import {BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxPageScrollCoreModule} from 'ngx-page-scroll-core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TimeagoModule, TimeagoIntl, TimeagoFormatter, TimeagoCustomFormatter} from 'ngx-timeago';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgxStarsModule} from 'ngx-stars';
import {OwlModule} from 'ngx-owl-carousel';
import {RestService} from './shared/services/rest.service';
import {UtilsService} from './shared/services/util.service';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {NgxEpicVideoPlayerModule} from 'ngx-epic-video-player';
import {ChartModule} from 'angular-highcharts';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ZipLocationComponent} from './module/home/components/zip-location/zip-location.component';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {NgxGalleryModule} from 'ngx-gallery';
import {NgSelectModule} from '@ng-select/ng-select';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {CookieService} from 'ngx-cookie-service';
import {SidebarComponent} from './module/home/pages/dashboard/sidebar/sidebar.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AuthGuard} from './module/auth/guards/auth.guard';
import {ShoppingCartComponent} from './module/home/components/shopping-cart/shopping-cart.component';
import {ModalBankComponent} from './module/home/pages/profile/modal-bank/modal-bank.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {DropTargetOptions, MineTypeEnum, NgxUploadModule} from '@wkoza/ngx-upload';
import {NgxFlagIconCssModule} from 'ngx-flag-icon-css';
import {ModalShippingComponent} from './module/home/pages/profile/modal-shipping/modal-shipping.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TabsModule} from 'ngx-bootstrap';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {WelcomeComponent} from './module/home/components/welcome/welcome.component';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {TruncateModule} from 'ng2-truncate';
import {NgxContentLoadingModule} from 'ngx-content-loading';
import {NgxImageZoomModule} from 'ngx-image-zoom';
import {NgxStripeModule} from 'ngx-stripe';
import {DateTimePickerModule} from 'ngx-datetime-picker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {UiSwitchModule} from 'ngx-ui-switch';
import {ModalImageComponent} from './module/home/pages/products/create-product/modal-image/modal-image.component';
import {ModalShoppingComponent} from './module/home/components/modal-shopping/modal-shopping.component';
import {ModalVariationsProductComponent} from './module/home/pages/products/create-product/modal-variations-product/modal-variations-product.component';
import {ModalProductBankComponent} from './module/home/pages/products/create-product/modal-product-bank/modal-product-bank.component';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ModalWarningComponent} from './module/home/components/modal-warning/modal-warning.component';
import {AppModule} from './app.module';
import {environment} from '../environments/environment';

export const ngxDropTargetOptions: DropTargetOptions = {
  color: 'dropZoneColor',
  colorDrag: 'dropZoneColorDrag',
  colorDrop: 'dropZoneColorDrop',
  multiple: false,
  accept: [MineTypeEnum.Image]
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.google_provider)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.fb_provider)
  }
]);

export function provideConfig() {
  return config;
}

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
}

@NgModule({
  imports: [
    LoadingBarHttpClientModule,

    AppRoutingModule,
    NgxGalleryModule,
    AngularFontAwesomeModule,
    OwlModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    GooglePlaceModule,
    NgxDropzoneModule,
    NgxContentLoadingModule,
    NgxStarsModule,
    NgxFlagIconCssModule,
    ChartModule,
    VgCoreModule,
    TruncateModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    UiSwitchModule,
    NgxEpicVideoPlayerModule,
    DateTimePickerModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot(),
    NgxDaterangepickerMd.forRoot(),
    TimepickerModule.forRoot(),
    NgxStripeModule.forRoot(environment.stripe_public_key),
    TabsModule.forRoot(),
    NgxImageZoomModule.forRoot(),
    NgxUploadModule.forRoot(ngxDropTargetOptions),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TimeagoModule.forRoot({
      intl: {provide: TimeagoIntl, useClass: MyIntl},
      formatter: {provide: TimeagoFormatter, useClass: TimeagoCustomFormatter},
    }),
    NgxPageScrollCoreModule.forRoot({duration: 2500}),
    NgxChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    }),
    AppModule,
    BrowserTransferStateModule
  ],

  providers: [
    RestService,
    UtilsService,
    AuthGuard,
    BsModalService,
    BsModalRef,
    ZipLocationComponent,
    ShoppingCartComponent,
    ModalBankComponent,
    SidebarComponent,
    CookieService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }

  ],
  entryComponents: [
    ZipLocationComponent,
    ModalBankComponent,
    ModalShippingComponent,
    WelcomeComponent,
    ModalImageComponent,
    ModalShoppingComponent,
    ModalVariationsProductComponent,
    ModalProductBankComponent,
    ModalWarningComponent
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
