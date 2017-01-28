import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app works!';
  constructor(public authService:AuthService, public router:Router){

  }
  isLoggedin(){
    return !this.authService.User;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
