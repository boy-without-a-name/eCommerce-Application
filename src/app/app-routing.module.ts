import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { AppLoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundViewComponent } from './components/not-found-view/not-found-view.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authenticatedGuard } from './shared/functions/auth.guard';
import { unauthenticatedGuard } from './shared/functions/unauth.guard';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductComponent } from './components/product/product.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BasketComponent } from './components/basket/basket.component';


const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'main', component: MainViewComponent },
  { path: 'login', component: AppLoginComponent, canActivate: [authenticatedGuard()] },
  { path: 'registration', component: RegisterComponent, canActivate: [authenticatedGuard()] },
  { path: 'profile', component: ProfileComponent, canActivate: [unauthenticatedGuard()] },
  { path: 'product/:id', component: ProductComponent },
  { path: 'basket', component: BasketComponent },
  { path: '**', component: NotFoundViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
