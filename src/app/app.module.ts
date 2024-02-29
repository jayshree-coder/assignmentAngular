import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component'; // Import the SignupComponent
import { AuthInterceptor } from './config/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { AdminGuard } from './guard/admin.guard';
import { PublicGuard } from './guard/public.guard';
import {HeadersComponent} from './component/headers/headers.component';
import {FooterComponent} from './component/footers/footer.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UserListsComponent } from './pages/user-lists/user-lists.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeadersComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent,
    UserListsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    NgbModule,
    NgbNavModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AdminGuard,
    CookieService,
    PublicGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
