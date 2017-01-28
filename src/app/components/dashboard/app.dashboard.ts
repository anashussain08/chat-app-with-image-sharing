import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods,FirebaseApp} from 'angularfire2';
import { AuthService } from './../../services/auth.service';
import { DataService} from './../../services/data.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
    selector:'dashboard',
    templateUrl:'./app.dashboard.html',
    styleUrls:['./app.dashboard.css']
})

export class Dashboard implements OnInit{
    user:any;
    _allUsers:any;
    currentSelectedUser:any;
    current:any;
    currentChatNode:any;
    chatRef:any;
    _allCurrentMessages:any=[];
    selectedFile:any;
    fbStorage:firebase.storage.Reference;
    constructor(public af:AngularFire,public authService:AuthService, public dataService:DataService,@Inject(FirebaseApp) private firebaseApp:any){
        this.fbStorage = this.firebaseApp.storage().ref();
    }
    ngOnInit(){
        this.chatRef = this.af.database.list('/chats');
        this.clearModel();
        this.user = this.authService.User;
        this.fetchUsers();

    }
    clearModel(){
        this.current = {
            message:''
        };
    }
    fetchUsers(){
        this.dataService.getUsers()
        .subscribe(
            data=>{
                let _data:any = data;
                this._allUsers = _data.filter(item=>item.email != this.user.email);
            },
            err=>{

            },
            ()=>{

            }
        )
    }
    selectUserTochat(user){
        this._allCurrentMessages = [];
        this.currentSelectedUser = user;
        console.log(`${user} from select user`);
        this.currentChatNode = this.formulateNode();
        this.getCurrentChatList();
        //this.chatListner();
    }
    sendMessage(){
        let _data = {
            sender:this.currentSelectedUser.$key,
            reciever:this.user.$key,
            createdAt:firebase.database.ServerValue.TIMESTAMP,
            message:this.current.message
        };
         let node = this.af.database.list('/chats/'+this.currentChatNode);
         node.push(_data);
         this.clearModel();
        // console.log(`${this.current.message}`);
    }
    getCurrentChatList(){
        this._allCurrentMessages = [];
        this.af.database.list('/chats/'+this.currentChatNode)
        .subscribe(
            chats=>{
                this._allCurrentMessages = chats;

            }
        )
    }
    chatListner(){
       let stream$ =  this.af.database.list('/chats/'+this.currentChatNode);
        stream$
        .subscribe(
            data=>{
                console.log(`${data}`);
                if(data){
                    this._allCurrentMessages.push(data[data.length-1]);
                }
            }
        )
    }
    formulateNode(){
        let node = '';
        this.currentChatNode = '';
        if(this.user.createdAt > this.currentSelectedUser.createdAt){
            node =this.currentSelectedUser.$key + this.user.$key;
        }
        else{
            node = this.user.$key + this.currentSelectedUser.$key;
        }
        return node;
    }
    getFile(fileInput:any){
        this.selectedFile = fileInput.target.files[0];
    }
    
    uploadFile(){
        if(this.selectedFile){
            let storageRef = this.fbStorage.child(this.selectedFile.name);
            storageRef.put(this.selectedFile)
                .then(
                    snapshot=>{
                        storageRef.getDownloadURL().then(
                            getUrl=>{
                                console.log(`generated file url ${getUrl}`);
                                let _data = {
                                    sender:this.user.$key,
                                    reciever:this.currentSelectedUser.$key,
                                    message:'',
                                    createdAt:firebase.database.ServerValue.TIMESTAMP,
                                    url:getUrl
                                };
                                let node = this.af.database.list('/chats/'+this.currentChatNode);
                                node.push(_data);
                                this.selectedFile = null;
                            },e=>{
                                console.log(e);
                            }
                        )
                    },err=>{
                        console.log(` ${err} error from uploadFile`)
                    }
                )
        }
    }
}