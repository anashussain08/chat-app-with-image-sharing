import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { BehaviorSubject, ReplaySubject,Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ValidUser } from './../components/signup/user';
import { user } from './../components/login/model';
import * as firebase from 'firebase';

@Injectable()

export class DataService{
    _allUsers:any=[];
   
    
    constructor(public af: AngularFire, public router:Router){

    }
    
    
   
    getUsers(){
        let promise= new Promise((resolve,reject)=>{
            this.af.database.list('/users')
            .subscribe(
                data=>{
                    this.allUsers = data;
                    resolve(this.allUsers);
                },
                err=>{
                    reject(err);
                },
                ()=>{
                    //console.log('');
                }
            )
        })
        return Observable.fromPromise(promise);
    }
   
    
    set allUsers(users){
        this._allUsers = users;
    }
    get allUsers(){
        return this._allUsers;
    }
  
}