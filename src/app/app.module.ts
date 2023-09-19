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
import { ProfileComponent } from './components/profile/profile.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CardComponent } from './components/card-product/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostModalImgComponent } from './components/post-modal-img/post-modal-img.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponent } from './components/product/product.component';
import { CardFilterComponent } from './components/card-product-filter/card.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BasketComponent } from './components/basket/basket.component';
import { PromosComponent } from './components/promos/promos.component';
import { BurgerIconComponent } from './components/burger-icon/burger-icon.component';

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
    ProfileComponent,
    CatalogComponent,
    CardComponent,
    ProductComponent,
    CardFilterComponent,
    PostModalImgComponent,
    AboutUsComponent,
    BasketComponent,
    PromosComponent,
    BurgerIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
