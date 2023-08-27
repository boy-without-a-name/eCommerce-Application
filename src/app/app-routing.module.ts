import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './components/main-view/main-view.component';
import { AppLoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundViewComponent } from './components/not-found-view/not-found-view.component';
import { authenticationGuard } from './shared/functions/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainViewComponent },
  { path: 'login', component: AppLoginComponent, canActivate: [authenticationGuard()] },
  { path: 'registration', component: RegisterComponent, canActivate: [authenticationGuard()] },
  { path: 'profile', component: ProfileComponent, canActivate: [authenticationGuard()] },
  { path: '**', component: NotFoundViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
