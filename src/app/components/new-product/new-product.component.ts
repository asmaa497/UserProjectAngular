import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ICategory } from 'src/app/ViewModels/ICategory';
import { IProduct } from 'src/app/ViewModels/IProduct';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  newPrd: IProduct={} as IProduct;
  ProUpdateId:number=0
  catList: ICategory[]=[];
  response:{dbpath:''}|undefined
  
 
  constructor(private prdService: ProductService
    , private router: Router
    ,private CatService:CategoryService,
    private activatedRoute:ActivatedRoute ) 
    { 
      
      this.CatService.getAllCateogories().subscribe(CatLst=>{
        this.catList=CatLst;
      
      })

    }

  ngOnInit(): void {
    this.ProUpdateId=Number(this.activatedRoute.snapshot.paramMap.get("pid"));
    if(this.ProUpdateId!=0)
    {
      this.prdService.getProductByID(this.ProUpdateId).subscribe(prd=>{
        this.newPrd=prd;
      });
    }
    
  }
  saveProduct()
  {
    if(this.response)
    {
      this.newPrd.img= this.response.toString() ;
      console.log("this is image  "+this.newPrd.img)
      
        this.ProUpdateId=Number(this.activatedRoute.snapshot.paramMap.get("pid"));
    if(this.ProUpdateId!=0)
    {
      this.prdService.updatePro(this.newPrd,+this.ProUpdateId);
      this.router.navigate(['/Products']);
      
    }
    else
    {
      this.prdService.addNewProduct(this.newPrd).subscribe(prd=>{
        this.router.navigate(['/Products']);
      });
    }
  }
  
    
  }

  uploadFinished(event:any)
  {
    this.response= event.dbPath;
    console.log("response  "+this.response);   
    
    
  }
  

}
