import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  Islogged:boolean=false;
  constructor(private AuthSer:AuthService) { }

  ngOnInit(): void {
    this.Islogged=this.AuthSer.IsLogged;
  }
  logout()
  {
    this.AuthSer.Logout();
  }

}
