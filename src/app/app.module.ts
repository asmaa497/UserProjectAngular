import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideMenuComponent } from './components/SideMenu/SideMenu.component';
import { ProductCardDirective } from './Directives/ProductCard.directive';
import { NationalIDPipe } from './pipes/nationalID.pipe';
import { CreditPipe } from './pipes/credit.pipe';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LayoutComponent } from './components/layout/layout.component';
import {HttpClientModule} from '@angular/common/http';
import { NewProductComponent } from './components/new-product/new-product.component';
import { UploadComponent } from './components/upload/upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from "@angular/material/dialog";
import { ImgComponent } from './components/img/img.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductCardDirective,
    NationalIDPipe,
    CreditPipe,
    HeaderComponent,
    FooterComponent,
    
    SideMenuComponent,
    
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    
    NotFoundComponent,
    LayoutComponent,
    NewProductComponent,
    UploadComponent,
    
    ImgComponent
    
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ImgComponent]
})
export class AppModule { }
