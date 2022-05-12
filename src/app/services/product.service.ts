import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../ViewModels/IProduct';
import { IProductQuantity } from '../ViewModels/iproduct-quantity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  ProductList: IProduct[]=[];
  private NumOfItemsSubject:BehaviorSubject<number>;
  private httpOptions;
  constructor(private httpClient: HttpClient) { 
    let cartItems:IProductQuantity[]=[]
    if(localStorage.getItem("cart")!=null)
    {
       cartItems=JSON.parse((localStorage.getItem("cart")) as any);
    }
    this.NumOfItemsSubject=new BehaviorSubject<number>(cartItems.length);
    console.log("this.NumOfItemsSubject  "+this.NumOfItemsSubject);
    this.httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // , Authorization': 'Token'
      })
    }
    
  }
  
  getAllProducts(): Observable<IProduct[]>
  {
    return this.httpClient.get<IProduct[]>(`${environment.APIBaseURL}/product`)
        // .pipe(
        //   retry(3),
        //   catchError((err)=>{})
        // );
  }

  getProductsByCatID(catID: number): Observable<IProduct[]>
  {
    console.log("ddddddd "+catID);
       if(catID==0)
       {
        return this.httpClient.get<IProduct[]>(`${environment.APIBaseURL}/product`);
       }
       else
       { 
        return this.httpClient.get<IProduct[]>(`${environment.APIBaseURL}/product/CatID?id=${catID}`);       
      }
    
  }
  getProductByID(prdID: number|undefined): Observable<IProduct>
  {
    return this.httpClient.get<IProduct>(`${environment.APIBaseURL}/product/${prdID}`);
  }

  addNewProduct(newPrd: IProduct): Observable<IProduct>
  {
    return this.httpClient.post<IProduct>(`${environment.APIBaseURL}/product`, JSON.stringify(newPrd),this.httpOptions);
  }

  updatePro(updatedPro: IProduct, id: number|undefined)
  {
    console.log("id is "+id);
    console.log("service called");
    console.log("name "+updatedPro.name);
    console.log("quantity "+updatedPro.quantity);
    console.log("price "+updatedPro.price);
    console.log("immage "+updatedPro.img);
    console.log("catID "+updatedPro.catID);
    return  this.httpClient.patch<IProduct>(`${environment.APIBaseURL}/product/${id}`, JSON.stringify(updatedPro),this.httpOptions);
     console.log("after calling service");
  }
  DeletePro( id: number|undefined): Observable<IProduct> 
  {
    return this.httpClient.delete<IProduct>(`${environment.APIBaseURL}/products/${id}`);
  }
  getCartElementsNum()
  {
    return this.NumOfItemsSubject;
  }
  increaseNumOfItems()
  {
    this.NumOfItemsSubject.next((this.NumOfItemsSubject.getValue())+1);
  }
  decreaseNumOfItems()
  {
    this.NumOfItemsSubject.next((this.NumOfItemsSubject.getValue())-1);
  }
  refreshNumOfItems()
  {
    this.NumOfItemsSubject.next(JSON.parse((localStorage.getItem("cart")) as any).length);
  }
  
}
