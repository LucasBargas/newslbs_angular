import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { News } from '../models/news.model';
import { environment } from '../../environments/environment.prod';
import { SupabaseConfigService } from './supabase-config.service';
import { CategoriesSignalService } from './categories-signal.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private _categoriesSignal = inject(CategoriesSignalService);
  category = this._categoriesSignal.category;
  private _http = inject(HttpClient);
  private _supabaseConfig = inject(SupabaseConfigService);
  private _API_URL = `${environment.supabaseUrl}/rest/v1/news`;
  public searchLoading$ = new BehaviorSubject<boolean>(true);
  public loading$ = new BehaviorSubject<boolean>(false);

  or(term: string): string {
    const likeQuery = `*${term}*`;
    const or = `(title.ilike.${likeQuery},description.ilike.${likeQuery},category.ilike.${likeQuery},author.ilike.${likeQuery})`;
    return or;
  }

  searchNews(term: string): Observable<News[]> {
    this.searchLoading$.next(true);
    const params = new HttpParams().set('or', this.or(term));

    return this._http
      .get<News[]>(this._API_URL, {
        headers: this._supabaseConfig.headers(),
        params,
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.searchLoading$.next(false);
          }, 400);
        }),
      );
  }

  getAllNews(
    search: string,
    order: 'aleat' | 'asc' | 'desc',
    isFavorite?: boolean,
  ): Observable<News[]> {
    this.loading$.next(true);

    let params = new HttpParams();

    if (search) {
      const orParam =
        this.category().length > 0
          ? `(category.ilike.*${search}*)`
          : this.or(search);

      params = params.set('or', orParam);
    }

    if (order && order !== 'aleat') {
      params = params.set('order', `created_at.${order}`);
    }

    if (isFavorite) {
      params = params.set('isFavorite', 'eq.true');
    }

    return this._http
      .get<News[]>(this._API_URL, {
        params,
        headers: this._supabaseConfig.headers(),
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.loading$.next(false);
          }, 600);
        }),
      );
  }

  getNewsById(id: string): Observable<News> {
    this.loading$.next(true);

    const params = new HttpParams()
      .set('id', `eq.${id}`)
      .set('select', '*')
      .set('limit', 1);

    return this._http
      .get<News[]>(this._API_URL, {
        headers: this._supabaseConfig.headers(),
        params,
      })
      .pipe(
        map((result) => result[0]),
        finalize(() => {
          setTimeout(() => {
            this.loading$.next(false);
          }, 600);
        }),
      );
  }

  postNews(news: News): Observable<News> {
    return this._http
      .post<News[]>(this._API_URL, news, {
        headers: this._supabaseConfig.headers(),
      })
      .pipe(map((result) => result[0]));
  }

  updateNews(id: string, data: Partial<News>): Observable<News> {
    const url = `${this._API_URL}?id=eq.${id}`;

    return this._http
      .patch<News[]>(url, data, {
        headers: this._supabaseConfig.headers(),
      })
      .pipe(map((result) => result[0]));
  }
}
