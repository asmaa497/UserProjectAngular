import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../ViewModels/IProduct';
import { ICategory } from '../ViewModels/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private httpOptions;
  constructor(private httpClient:HttpClient) { 
    this.httpOptions={
       headers:new HttpHeaders({
        'Content-Type': 'application/json'
       })
    }
  }

  getAllCateogories(): Observable<ICategory[]>
  {
    return this.httpClient.get<ICategory[]>(`${environment.APIBaseURL}/category`) 
  }
}
