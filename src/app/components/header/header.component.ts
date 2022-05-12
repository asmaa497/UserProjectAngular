import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Islogged:boolean=false;
  cartItemsNumber:number=0
  constructor(private AuthSer:AuthService,private router:Router,private ProService:ProductService) { }

  ngOnInit() {
    this.Islogged=this.AuthSer.IsLogged;
    this.ProService.getCartElementsNum().subscribe(num=>{
      this.cartItemsNumber=num;
    });
  }
  logout()
  {
    this.AuthSer.Logout();
    this.router.navigate(['Home']);

  }
  

}
