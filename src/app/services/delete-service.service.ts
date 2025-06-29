import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { SupabaseConfigService } from './supabase-config.service';
import { News } from '../models/news.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  constructor(
    private http: HttpClient,
    private supabaseConfig: SupabaseConfigService,
  ) {}

  deleteById(
    resource: 'news' | 'categories',
    id: number | string,
  ): Observable<News | Category> {
    const url = `${environment.supabaseUrl}/rest/v1/${resource}?id=eq.${id}`;

    return this.http.delete<News | Category>(url, {
      headers: this.supabaseConfig.headers(),
    });
  }
}
