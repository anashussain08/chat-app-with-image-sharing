import { Component,OnInit } from '@angular/core';
import { user } from './model';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
@Component({
    selector:'login',
    templateUrl:'./app.login.html',
    styleUrls:['./app.login.css']
})

export class Login implements OnInit{
    model:user;
    spinner:boolean = false;

    constructor(public authService:AuthService,public router:Router){

    }
    ngOnInit(){
       this.clearModel();
    }
    clearModel(){
        this.model = {
            email:'',
            password:'',
            type:''
        }
    }
    cancel(){
        this.clearModel();
    }
    onLogin(){
        console.log(`${this.model.password} ${this.model.email} ${this.model.type}`);
        this.spinner = !0;
        this.authService.login(this.model)
        .then(data=>{
            this.spinner  = false;
            this.router.navigate(['/dashboard']);
            this.clearModel();
        })
        .catch(err=>{
            this.clearModel();
            this.spinner  = false;
            
        });
    }
}