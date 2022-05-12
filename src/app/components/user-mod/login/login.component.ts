import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { IProductQuantity } from 'src/app/ViewModels/iproduct-quantity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cart:IProductQuantity[]=[]
  constructor(private AuthSer:AuthService,private router:Router,private ProService:ProductService) {
    //localStorage.setItem("cart",JSON.stringify( this.cart));
    this.ProService.refreshNumOfItems();
   }
  Islogged:boolean=false;
  UserName:string="";
  password:string="";
  ngOnInit(): void {
    this.Islogged=this.AuthSer.IsLogged;
  }
  login()
  {
    this.AuthSer.Login(this.UserName,this.password).subscribe(tkn=>{
         localStorage.setItem("token",tkn.token);
         this.router.navigate(['/Home'])
         
    },(error)=>{
      alert("User name or passwors is incorrect");
    });
  }
  

}
