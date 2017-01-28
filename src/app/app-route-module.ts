import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { Login } from './components/login/app.login';
import { SignUp } from './components/signup/app.signup';
import { Dashboard } from './components/dashboard/app.dashboard';

const routes: Routes = [
    {
        path:'login',component:Login, children:[]
    },
    {
        path:'signup',component:SignUp, children:[]
    },
    {
        path:'dashboard',component:Dashboard, children:[]
    },
    {
        path:'', redirectTo:'login',pathMatch:'full'
    }
]

@NgModule({
 imports:[RouterModule.forRoot(routes)],
 exports:[RouterModule],
 providers:[]   
})

export class AppRouter{}
