import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './commonWebPagesComponents/footer/footer.component';
import { NavigationBarComponent } from './commonWebPagesComponents/navigation-bar/navigation-bar.component';
import { LoginComponent } from './webPages/login/login.component';
import { HomeComponent } from './webPages/home/home.component';
import { SignUpComponent } from './webPages/sign-up/sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import { EventComponent } from './webPages/event/event.component';
import { ProfilComponent } from './webPages/profil/profil.component';
import { HomeEventListCategoryComponent } from './webPages/home/home-event-list-category/home-event-list-category.component';
import { HomeEventComponent } from './webPages/home/home-event/home-event.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpRequestInterceptor} from './specialClass/http-request-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationBarComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    EventComponent,
    ProfilComponent,
    HomeEventListCategoryComponent,
    HomeEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
