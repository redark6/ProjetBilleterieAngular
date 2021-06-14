import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {HomeComponent} from './webPages/home/home.component';
import {LoginComponent} from './webPages/login/login.component';
import {SignUpComponent} from './webPages/sign-up/sign-up.component';
import {EventComponent} from './webPages/event/event.component';
import {ProfilComponent} from './webPages/profil/profil.component';
import {EventFormComponent} from './webPages/event-form/event-form.component';
import {EventsComponent} from './webPages/events/events.component';
import {EventResolver} from './webPages/event/event-resolver';
import {Error404Component} from './webPages/error404/error404.component';
import {MyEventComponent} from './webPages/my-event/my-event.component';
import {EventEditResolver} from './webPages/event-form/event-edit-resolver';
import {OrganiserPageComponent} from './webPages/organiser-page/organiser-page.component';


const routes: Routes = [
  { path : 'myevent-list', component : MyEventComponent},
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },

  { path: 'event/:id',
    component: EventComponent,
    resolve: {event: EventResolver }
  },

  { path: 'profil', component: ProfilComponent},

  { path: 'event-form', component: EventFormComponent},

  { path: 'event-edit/:id',
    component: EventFormComponent,
    resolve: {event: EventEditResolver }
  },

  { path: 'events', component: EventsComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'error404', component: Error404Component },
  {path: 'myevent', component: MyEventComponent},
  { path: 'organiser-page/:username', component: OrganiserPageComponent}

  // { path: 'not-found', component: Error404Component },
  // { path: '**', redirectTo: 'not-found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
