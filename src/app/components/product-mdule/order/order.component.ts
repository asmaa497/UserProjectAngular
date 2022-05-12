import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

import { ProductService } from 'src/app/services/product.service';
import { ICategory } from 'src/app/ViewModels/ICategory';
import { IProduct } from 'src/app/ViewModels/IProduct';
import { IProductQuantity } from 'src/app/ViewModels/iproduct-quantity';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit,AfterViewInit {
  selectedCatID:number=0;
  totalPrice:number=0;
  category:ICategory[]=[]
  ReceivedCartItems:IProductQuantity[]=[]
  @ViewChild('feedback') feedback!:ElementRef
  @ViewChild(ProductsComponent) ProductsCompObj!: ProductsComponent;
  // cart 
  constructor(
    private ProService:ProductService,
    private CatService:CategoryService ,
    private router:Router
    ) { 
     

}
  
  ngAfterViewInit(): void {
    // this.feedback.nativeElement.style.backgroundColor="lightblue";
    // this.feedback.nativeElement.value="asmaa ismail";
    // console.log(this.feedback.nativeElement.value);
    // //console.log(this.ProductsCompObj.ProductList) // using View Child
    // console.log(this.ProService.getAllProducts())

  }
  
  ngOnInit() {
    
    this.CatService.getAllCateogories().subscribe(CatLst=>{
      //console.log(JSON.stringify(CatLst));
      this.category=CatLst;
    
    })
    
  }
  showCart(CartObj:IProductQuantity)
  {
     //console.log("cart OBJ "+CartObj);
     this.ReceivedCartItems.push(CartObj);
     this.totalPrice+=CartObj.total;
  }
  confirm()
  {
    //var ExternalProductList=this.ProductsCompObj.ProductList; // using View Child
    // var ExternalProductList:IProduct[]=[]
    // this.ProService.getAllProducts().subscribe(ProLst=>{
    //   ExternalProductList=ProLst;
    //   //console.log("ExternalProductList IN"+ProLst);
      
    //   //this.ReceivedCartItems=[]
    // });
    var pro:IProduct={} as IProduct
    this.ReceivedCartItems.forEach(element => {
      this.ProService.getProductByID(element.ID).subscribe(P=>{
         //pro=P;
         pro.id=P.id;
         pro.catID=P.catID;
         pro.price=P.price;
         pro.img=P.img;
         pro.name=P.name;
         pro.quantity=P.quantity;
         pro.quantity-=element.count;
         
            
            console.log("Pro quantity with new Quqan "+pro.quantity);

            this.ProService.updatePro(pro,element.ID);
            alert("Ordered Successfully");
            this.router.navigate(["/Products"]);
      }); //subscripe
      
    }); //foreach
    
    this.ReceivedCartItems=[]
  }
  RemoveItem(item:IProductQuantity)
  {
    const index=this.ReceivedCartItems.findIndex(i=>i.ID==item.ID);
    
      this.totalPrice-=item.total;
      this.ReceivedCartItems.splice(index,1);
    
    
  }
  decrease(item:IProductQuantity)
  {
    if(item.count>1)
    {
      item.count--;
      this.totalPrice-=item.price;
      item.total-=item.price;
    }
    
  }
  increase(item:IProductQuantity)
  {
    var ExternalProductList:IProduct[]=[]
    this.ProService.getAllProducts().subscribe(ProLst=>{
      ExternalProductList=ProLst;
  });
    
    
    var prod=ExternalProductList.find(p=>p.id==item.ID);
    if(prod && item.count<prod.quantity)
    {
      item.count++;
      this.totalPrice+=item.price;
      item.total+=item.price;
    }
   
    
  }

}
