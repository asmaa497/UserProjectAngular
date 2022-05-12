import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/ViewModels/IProduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 products:IProduct[]=[]
  constructor(private PrdService:ProductService) { }

  ngOnInit(): void {
    this.PrdService.getAllProducts().subscribe(lst=>{
      this.products=lst;
    })
  }

}
