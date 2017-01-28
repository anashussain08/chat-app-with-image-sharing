import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { ValidUser } from './../components/signup/user';
import { user } from './../components/login/model';
import * as firebase from 'firebase';

@Injectable()

export class AuthService{
    public currentUserRegistered:ValidUser;
    public currentUser:any;
    public status:any;
    constructor(public af: AngularFire, public router:Router){

    }
    get User(){
        return this.currentUser;
    }
    set User(user){
        this.currentUser = user;
    }
    register(user:ValidUser){
       return new Promise((resolve,reject)=>{
           this.User = user;
           this.currentUserRegistered = user;
            this.createUser()
            .then(data=>{
                console.log(`user created! ${data}`);
                this.firebaseCreateUser(data)
                .then(firebaseData=>{
                this.login({email:this.currentUserRegistered.email,password:this.currentUserRegistered.password})
                    .then(loginData=>{
                        resolve(loginData);
                    })
                    .catch(e=>resolve(e));
                    
                })
                .catch(er=>reject(er));
            })
            .catch(err=>reject(err));
        }) 
    }
    createUser(){
        return new Promise((resolve,reject)=>{
            this.af.auth.createUser(this.currentUserRegistered)
            .then(data=>{
                resolve(data)})
            .catch(err=>{reject(err)
                })
        });
    }
    login(user:any){
       return new Promise((resolve,reject)=>{
        this.af.auth.login(user,
            { provider: AuthProviders.Password, method: AuthMethods.Password })
            .then(
            data=>{
                console.log(`${data} from login user`);
                this.getUserFirebase(data.auth.uid)
                .then(getData=>{
                    this.currentUser = getData;
                    resolve(getData);
                })
                .catch(er=>reject(er));
            }) 
            .catch(err=>{
                console.log(err);
                reject(err);    
            }
            );
       }) 
    }
    logout(){
        return new Promise((resolve,reject)=>{
            this.af.auth.logout();
            this.User = null;
        })
    }
    firebaseCreateUser(user:any){
        return new Promise((resolve,reject)=>{
                let _userObj = {
                username: this.currentUserRegistered.username,
                email: this.currentUserRegistered.email,
                type: this.currentUserRegistered.type,
                status:true,
                createdAt: firebase.database.ServerValue.TIMESTAMP
             };
            let userNode = this.af.database.object('/users/'+user.uid);
            userNode.set(_userObj)
            .then(
                data=>{
                    console.log(`data from database ${data}`);
                    resolve({});
            })
            .catch(err=>reject(err));
         })
        }
        getUserFirebase(uid:any){
            return new Promise((resolve,reject)=>{
               let data =  this.af.database.object('/users/'+uid);
               data.subscribe(user=>{
                   resolve(user);
               },
               err=>reject(err))
            })
        }
        
}