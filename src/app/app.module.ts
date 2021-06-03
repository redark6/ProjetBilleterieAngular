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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EventComponent } from './webPages/event/event.component';
import { ProfilComponent } from './webPages/profil/profil.component';
import { HomeEventListCategoryComponent } from './webPages/home/home-event-list-category/home-event-list-category.component';
import { HomeEventCardComponent } from './webPages/home/home-event-card/home-event-card.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpRequestInterceptor} from './specialClass/http-request-interceptor';
import {GlobalParameter} from './specialClass/global-parameter';
import {ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { EventsComponent } from './webPages/events/events.component';
import { SearchBarComponent } from './webPages/events/search-bar/search-bar.component';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {EventFormComponent} from './webPages/event-form/event-form.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {DatePipe, registerLocaleData} from '@angular/common';
import { EventListPaginationComponent } from './webPages/events/event-list-pagination/event-list-pagination.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { EventListComponent } from './webPages/events/event-list/event-list.component';
import { EventCommentComponent } from './webPages/event/event-comment/event-comment.component';
import { CommentListComponent } from './webPages/event/event-comment/comment-list/comment-list.component';
import { CommentComponent } from './webPages/event/event-comment/comment/comment.component';
import { CommentWriterComponent } from './webPages/event/event-comment/comment-writer/comment-writer.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import fr from '@angular/common/locales/fr';
import {NzCommentModule} from 'ng-zorro-antd/comment';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

import {NzRateModule} from 'ng-zorro-antd/rate';

import { EventEventCardComponent } from './webPages/events/event-event-card/event-event-card.component';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import { Error404Component } from './webPages/error404/error404.component';
import { MyEventComponent } from './webPages/events/my-event/my-event.component';


registerLocaleData(fr);

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
    HomeEventCardComponent,
    EventsComponent,
    SearchBarComponent,
    HomeEventCardComponent,
    EventsComponent,
    EventListPaginationComponent,
    EventFormComponent,
    EventListComponent,
    EventCommentComponent,
    CommentComponent,
    CommentWriterComponent,
    CommentListComponent,
    EventEventCardComponent,
    Error404Component,
    MyEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSliderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
    }),
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    NzCommentModule,
    NzFormModule,
    NzIconModule,
    NzAvatarModule,
    NzButtonModule,
    NzInputModule,
    NzPopoverModule,
    NzRateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    GlobalParameter,
    CookieService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    DatePipe,
    { provide: NZ_I18N, useValue: fr_FR }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CommentComponent]
})
export class AppModule { }
