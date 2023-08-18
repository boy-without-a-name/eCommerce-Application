import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
