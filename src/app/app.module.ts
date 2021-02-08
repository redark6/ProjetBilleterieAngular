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

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationBarComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
