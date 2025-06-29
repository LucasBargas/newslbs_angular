import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { SupabaseConfigService } from './supabase-config.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _API_URL = `${environment.supabaseUrl}/rest/v1/categories`;
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private supabaseConfig: SupabaseConfigService,
  ) {}

  getAllCategories(): Observable<Category[]> {
    this.loading$.next(true);

    return this.http
      .get<Category[]>(`${this._API_URL}?order=created_at.desc`, {
        headers: this.supabaseConfig.headers(),
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.loading$.next(false);
          }, 600);
        }),
      );
  }

  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this._API_URL, category, {
      headers: this.supabaseConfig.headers(),
    });
  }

  updateCategory(id: number, data: Partial<Category>): Observable<Category> {
    const url = `${this._API_URL}?id=eq.${id}`;
    return this.http.patch<Category>(url, data, {
      headers: this.supabaseConfig.headers(),
    });
  }
}
