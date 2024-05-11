import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./public/pages/login/login.component";
import {FindHouseComponent} from "./public/pages/main-content-keeper/busqueda/find-house.component";
import {MessengerKeeperComponent} from "./public/pages/main-content-keeper/messenger-keeper/messenger-keeper.component";
import {ProfileKeeperComponent} from "./public/pages/main-content-keeper/profile-keeper/profile-keeper.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {KeeperComponent} from "./public/pages/main-content-keeper/Home/keeper.component";
import {TravelerComponent} from "./public/pages/main-content-traveler/traveler/traveler.component";
import {FindKeeperComponent} from "./public/pages/main-content-traveler/find-keeper/find-keeper.component";
import {MessengerTravelerComponent} from "./public/pages/main-content-traveler/messenger-traveler/messenger-traveler.component";
import {ProfileTravelerComponent} from "./public/pages/main-content-traveler/profile-traveler/profile-traveler.component";
import {SigninComponent} from "./public/pages/signin/signin.component";
import {RegisterClientComponent} from "./public/pages/register-user/register-client/register-client.component";
import {RegisterAdminComponent} from "./public/pages/register-user/register-admin/register-admin.component";
import {LogeoComponent} from "./public/registross/logeo/logeo.component";
import {RegistroComponent} from "./public/registross/registro/registro.component";
import {TelephoneComponent} from "./public/registross/telephone/telephone.component";
import {DialogLogComponent} from "./public/dialog-log/dialog-log.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
/*{path: 'login', component: LoginComponent},*/
/*{path: 'login', component: LoginComponent},*/
  {path: 'register', component: RegisterClientComponent},
  {path: 'telephone', component: TelephoneComponent},
  {path: 'register-admin', component: RegisterAdminComponent},
  {path: 'home-client', component: KeeperComponent},
  {path: 'find-house', component: FindHouseComponent},
  {path: 'messenger-client', component: MessengerKeeperComponent},
  {path: 'profile-client', component: ProfileKeeperComponent},
  {path: 'home-admin', component: TravelerComponent},
  {path: 'find-client', component: FindKeeperComponent},
  {path: 'messenger-traveler', component: MessengerTravelerComponent},
  {path: 'profile-traveler', component: ProfileTravelerComponent},
  { path: 'sign-in', component : SigninComponent  },
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component:PageNotFoundComponent},

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
