import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from '../interfaces/ICategories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) { }

  getCaregories(): Observable<ICategories[]>  {
    return this.http.get<ICategories[]>(this.apiUrl);
  }
}
