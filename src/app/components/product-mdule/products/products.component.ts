import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

//import { ConsoleReporter } from 'jasmine';
import { ProductService } from 'src/app/services/product.service';

import { ICategory } from 'src/app/ViewModels/ICategory';
import { IProduct } from 'src/app/ViewModels/IProduct';
import { IProductQuantity } from 'src/app/ViewModels/iproduct-quantity';
import { Store } from 'src/app/ViewModels/Store';
import { ImgComponent } from '../../img/img.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges {

  strore = new Store();
  date: Date = new Date()
  FilteredProd: IProduct[] = []
  IsPurshased: boolean;
  ClientName: string;
  //ProductList: IProduct[]=[];
  categroy: ICategory[] = [];
  selectedCatID: number = 1
  prdListOfCat: IProduct[] = [];
  @Input() receivedSelCatID: number = 0;
  @Output() onAddToCart: EventEmitter<IProductQuantity>;
  birthDate: string = "29909011509345"
  creditCart: string = "0000000000000000"
  TestPro: IProduct = {} as IProduct
  constructor(private ProService: ProductService, private authSer: AuthService, private router: Router,
    private dialog: MatDialog) {
    this.onAddToCart = new EventEmitter<IProductQuantity>();
    this.strore.logo = "https://fakeimg.pl/250x100/";
    this.strore.name = "ZARA Store";
    this.strore.branches = ["assuit", "sohag"];
    this.ClientName = "asmaa";
    this.IsPurshased = true;

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ProService.getProductsByCatID(this.receivedSelCatID).subscribe(prdList => {
      this.prdListOfCat = prdList;
    });


  }
  ngOnInit(): void {
    this.ProService.getAllProducts().subscribe(prdList => {
      this.prdListOfCat = prdList;
    });

  }
  hide() {
    this.IsPurshased = !this.IsPurshased;
  }
  selected() {
    console.log(this.selectedCatID)
  }
  decrease(id: number | undefined) {
    this.ProService.getAllProducts().subscribe(ProLst => {
      ProLst.forEach(element => {
        if (element.id == id) {
          element.quantity--;
        }
      })
    })



  }
  AddToCartBtn(itemsCount: number, Pro: IProduct) {
    if (this.authSer.IsLogged) {
      if (itemsCount <= Pro.quantity && itemsCount > 0) {
        let cartItems: IProductQuantity[] = []

        if (localStorage.getItem("cart") != null) {
          cartItems = JSON.parse((localStorage.getItem("cart")) as any);
        }
        var FoundPro = cartItems.find(P => P.ID == Pro.id)
        if (FoundPro)
          alert("Product Already Exists");
        else {
          let item: IProductQuantity = {} as IProductQuantity
          item.ID = Pro.id;
          item.count = itemsCount;
          item.name = Pro.name;
          item.img = Pro.img;
          item.price = Pro.price;
          item.quantity = Pro.quantity;
          item.total = Pro.price * itemsCount;
          console.log(item);
          cartItems.push(item);
          console.log("cartItems  " + JSON.stringify(cartItems));
          localStorage.setItem("cart", JSON.stringify(cartItems));
          console.log("local now  " + localStorage.getItem("cart"));
          this.ProService.increaseNumOfItems();
          alert("Added Successfully");
        }
      }
      else {
        alert("Enter Valid Quantity");
      }
    } else {
      alert("Log in First ");
      this.router.navigate(['/User/login']);
    }

  }
  openNewPro() {

  }
  DeletePro(ProID: number | undefined) {
    
    var res = confirm("Are you sure you want to delete this product ?");
    if (res) {
      this.ProService.DeletePro(ProID).subscribe(pro => {
        console.log(pro);
      })
    }
    

  }
  public CreateImgPath(ServerPath: string) {
    return `http://localhost:4319/${ServerPath}`;
  }
  openDialog(imgPath: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const modalRef = this.dialog.open(ImgComponent, dialogConfig);
    modalRef.componentInstance.img = imgPath;
  }

}
