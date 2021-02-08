import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './webPages/home/home.component';
import {LoginComponent} from './webPages/login/login.component';
import {SignUpComponent} from './webPages/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LoginComponent }
  // { path: 'not-found', component: Error404Component },
  // { path: '**', redirectTo: 'not-found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
