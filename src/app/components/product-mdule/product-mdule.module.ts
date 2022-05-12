import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserAuthGuard } from 'src/app/Guards/user-auth.guard';

const routes:Routes=[
{path:"Order",component:OrderComponent},
{path:'cart', component:CartComponent,canActivate:[UserAuthGuard]}, 
{path:'Products/:pid', component:ProductDetailsComponent},
]

@NgModule({
  declarations: [ProductDetailsComponent,ProductsComponent,CartComponent,OrderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductMduleModule { }
