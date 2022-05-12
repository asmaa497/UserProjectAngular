import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/Guards/user-auth.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {path:'',redirectTo:'/User/UserProfile',pathMatch:'full'},
    {path:'UserProfile',component:UserProfileComponent,canActivate:[UserAuthGuard]},
    {path:"EditProfile",component:EditProfileComponent,canActivate:[UserAuthGuard]},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
]
@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModModule { }
