import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './webPages/home/home.component';
import {LoginComponent} from './webPages/login/login.component';
import {SignUpComponent} from './webPages/sign-up/sign-up.component';
import {EventComponent} from './webPages/event/event.component';
import {ProfilComponent} from './webPages/profil/profil.component';
import {EventsComponent} from './webPages/events/events.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'event', component: EventComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },

  { path: 'event/:id', component: EventComponent },
  { path: 'profil', component: ProfilComponent},
  { path: 'events', component: EventsComponent},
  { path: 'profil', component: ProfilComponent }

  // { path: 'not-found', component: Error404Component },
  // { path: '**', redirectTo: 'not-found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
