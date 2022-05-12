import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/ViewModels/IProduct';
import { IProductQuantity } from 'src/app/ViewModels/iproduct-quantity';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  cartItems: IProductQuantity[] = []
  constructor(private ProService: ProductService, private router: Router,private location:Location) {
    console.log("cart " + localStorage.getItem("cart"));
  }

  ngOnInit(): void {
    if(localStorage.getItem("cart")!=null)
    {
    this.cartItems = JSON.parse((localStorage.getItem("cart")) as any);
    this.cartItems.forEach(element => {
      this.totalPrice += element.total;
    });
  }
  }
  public CreateImgPath(ServerPath: string) {
    return `http://localhost:4319/${ServerPath}`;
  }

  decrease(item: IProductQuantity) {
    if (item.count > 1) {
      item.count--;
      this.totalPrice -= item.price;
      item.total -= item.price;
      /////////////// in local storage /////////////////
      let items:IProductQuantity[]=JSON.parse((localStorage.getItem("cart")) as any);
      var pro=items.find(P=>P.ID==item.ID);
      if(pro)
      {
        pro.count=pro.count-1;
        pro.total-=pro.price;
        localStorage.setItem("cart",JSON.stringify(items));
      }
      console.log("local after edit "+(localStorage.getItem("cart")));

    }

  }
  increase(item: IProductQuantity) {
    if (item.count < item.quantity) {
      item.count++;
      this.totalPrice += item.price;
      item.total += item.price;
      /////////////// in local storage /////////////////
      let items:IProductQuantity[]=JSON.parse((localStorage.getItem("cart")) as any);
      var pro=items.find(P=>P.ID==item.ID);
      if(pro)
      {
        pro.count=pro.count+1;
        pro.total+=pro.price;
        localStorage.setItem("cart",JSON.stringify(items));
      }
      console.log("local after edit "+(localStorage.getItem("cart")));

    }
    

  }
  confirm() {
    
    var pro: IProduct = {} as IProduct
    this.cartItems.forEach(element => {
      this.ProService.getProductByID(element.ID).subscribe(P => {
        
        pro.id = P.id;
        pro.catID = P.catID;
        pro.price = P.price;
        pro.img = P.img;
        pro.name = P.name;
        pro.quantity = P.quantity - element.count;
        console.log("Pro  with new Quqan " + JSON.stringify(pro));
        this.ProService.updatePro(pro, element.ID).subscribe(p=>{
          var proIndex=this.cartItems.findIndex(p=>p==element);
          this.cartItems.splice(proIndex,1);
          localStorage.setItem("cart",JSON.stringify(this.cartItems) );
          this.ProService.decreaseNumOfItems();
          
          console.log("length "+this.cartItems.length);
          if(this.cartItems.length==0)
          {
            this.router.navigate(['/Home']);
            alert("Ordered Successfully");
          }
        });
        
      });
    });
  }

Remove(item:IProductQuantity)
{
    var res=confirm("Delete Item ?");
    if(res)
    {

    var pro=this.cartItems.findIndex(i=>i==item);
    this.cartItems.splice(pro,1);
    this.totalPrice-=item.total;
     /////////////// in local storage /////////////////
     let items:IProductQuantity[]=JSON.parse((localStorage.getItem("cart")) as any);
     var index=items.findIndex(P=>P.ID==item.ID);
      items.splice(index,1);
       localStorage.setItem("cart",JSON.stringify(items) );
       console.log("local after del "+(localStorage.getItem("cart"))); 
       this.ProService.decreaseNumOfItems();

    }
}


}
