import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy, NgOptimizedImage } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { SocialsComponent } from './components/socials/socials.component';
import { ButtonComponent } from './components/button/button.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundViewComponent } from './components/not-found-view/not-found-view.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { NavLinksComponent } from './components/nav-links/nav-links.component';
import { ProductComponent } from './components/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    MainComponent,
    HeaderComponent,
    CartComponent,
    HeaderSearchComponent,
    FooterComponent,
    LogoComponent,
    SocialsComponent,
    ButtonComponent,
    MainViewComponent,
    RegisterComponent,
    NotFoundViewComponent,
    UserIconComponent,
    NavLinksComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
