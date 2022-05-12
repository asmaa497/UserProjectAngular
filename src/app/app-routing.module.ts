import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { ImgComponent } from './components/img/img.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserAuthGuard } from './Guards/user-auth.guard';

const routes: Routes = [
  {path: '', component:LayoutComponent, children: [
    {path:'', redirectTo:'/Home', pathMatch:'full'},
    {path:'Home', component:HomeComponent},
    {path:'AboutUs', component:AboutUsComponent},
    {path:'ContactUs', component:ContactUsComponent}, 
    {path:'NewProduct/:pid', component:NewProductComponent}, 
    {path:'img', component:ImgComponent}, 
    
    {
      path: 'Pro',
      loadChildren: () => import('src/app/components/product-mdule/product-mdule.module').then(m => m.ProductMduleModule)
    },
  ]},
  
  
  {
    path: 'User',
    loadChildren: () => import('src/app/components/user-mod/user-mod.module').then(m => m.UserModModule)
  },
  
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
