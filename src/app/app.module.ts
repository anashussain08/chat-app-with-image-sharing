import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2'; 
import { MaterialModule } from '@angular/material';

import { AppRouter} from './app-route-module';
import { AppComponent } from './app.component';
import { SignUp } from './components/signup/app.signup';
import { Login } from './components/login/app.login';
import { Dashboard } from './components/dashboard/app.dashboard';

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

  // Initialize Firebase
  export const  firebaseConfig = {
     apiKey: "AIzaSyAX-EI0Bl_WzAqPG9FphEizr5K9yjpsXl4",
    authDomain: "chat-app-d372e.firebaseapp.com",
    databaseURL: "https://chat-app-d372e.firebaseio.com",
    storageBucket: "chat-app-d372e.appspot.com",
    messagingSenderId: "611168602285"
  };


@NgModule({
  declarations: [
    AppComponent,
    SignUp,
    Login,
    Dashboard,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouter,
    AngularFireModule.initializeApp(firebaseConfig),
    MaterialModule.forRoot()
  ],
  providers: [
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
