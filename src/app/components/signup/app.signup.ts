import { Component, OnInit } from '@angular/core';
import { ValidUser } from './user';
import { Router } from '@angular/router';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
    selector:'signup',
    templateUrl:'./app.signup.html',
    styleUrls:['./app.signup.css']
})

export class SignUp implements OnInit{
    model:ValidUser;
    userStream$;
    spinner:boolean = false;
    
    constructor(public af: AngularFire, public router:Router, public authService:AuthService){
    }
    ngOnInit(){
        this.clearModel();
    }
    clearModel(){
        this.model = {
            email:'',
            username:'',
            password:'',
            type:''
        }
    }
    onSignUp(){
        let self = this;
        this.spinner = !0;
        this.authService.register(this.model)
        .then(data=>{
            this.router.navigate(['/dashboard'])
            this.spinner = false;
            this.clearModel();
        })
        .catch(err=>{
            console.log(err);
            this.clearModel();
            this.spinner = false;
        })
        // this.createUserAf()
        // .then(data=>{
        //     console.log(`user created! ${data}`);
        //     this.loginUser();
        // })
        // .catch(err=>console.log(err));
    }
    cancel(){
        this.clearModel();
    }
    // createUserAf(){
    //     return new Promise((resolve,reject)=>{
    //         this.af.auth.createUser(this.model)
    //         .then(data=>{
    //             resolve(data)})
    //         .catch(err=>{reject(err)
    //          this.clearModel();
    //             })
    //     });
    //     //this.userStream$.fromPromise(promise);
        
    // }
    // loginUser(){
    //     this.af.auth.login({email:this.model.email,password:this.model.password},
    //     { provider: AuthProviders.Password, method: AuthMethods.Password })
    //     .then(
    //        data=>{console.log(`${data} from login user`);
    //         this.firebaseLoginUserNode(data.uid);
    //      } 
    //     )
    //     .catch(err=>{console.log(err)
    //     this.clearModel();
    //         }
    //     );
    // }
    // firebaseLoginUserNode(id:any){
    //     let _userObj = {
    //         username: this.model.username,
    //         email: this.model.email,
    //         type: this.model.type,
    //         status:true,
    //         createdAt: firebase.database.ServerValue.TIMESTAMP
    //     };
    //     this.clearModel();
    //     let userNode = this.af.database.object('/users/'+id);
    //     userNode.set(_userObj)
    //     .then(data=>{console.log(`data from database ${data}`)
    //     })
    //     .catch(err=>console.log(err));
    // }
}