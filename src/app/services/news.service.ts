import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { News } from '../models/news.model';
import { environment } from '../../environments/environment.prod';
import { SupabaseConfigService } from './supabase-config.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private _API_URL = `${environment.supabaseUrl}/rest/v1/news`;
  public searchLoading$ = new BehaviorSubject<boolean>(true);
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private supabaseConfig: SupabaseConfigService,
  ) {}

  or(term: string): string {
    const likeQuery = `*${term}*`;
    const or = `(title.ilike.${likeQuery},description.ilike.${likeQuery},category.ilike.${likeQuery},author.ilike.${likeQuery})`;
    return or;
  }

  searchNews(term: string): Observable<News[]> {
    const params = new HttpParams().set('or', this.or(term));
    this.searchLoading$.next(true);

    return this.http
      .get<News[]>(this._API_URL, {
        headers: this.supabaseConfig.headers(),
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
      params = params.set('or', this.or(search));
    }

    if (order && order !== 'aleat') {
      params = params.set('order', `created_at.${order}`);
    }

    if (isFavorite) {
      params = params.set('isFavorite', 'eq.true');
    }

    return this.http
      .get<News[]>(this._API_URL, {
        params,
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

  getNewsById(id: string): Observable<News> {
    this.loading$.next(true);

    const params = new HttpParams()
      .set('id', `eq.${id}`)
      .set('select', '*')
      .set('limit', 1);

    return this.http
      .get<News[]>(this._API_URL, {
        headers: this.supabaseConfig.headers(),
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
    return this.http
      .post<News[]>(this._API_URL, news, {
        headers: this.supabaseConfig.headers(),
      })
      .pipe(map((result) => result[0]));
  }

  updateNews(id: string, data: Partial<News>): Observable<News> {
    const url = `${this._API_URL}?id=eq.${id}`;

    return this.http
      .patch<News[]>(url, data, {
        headers: this.supabaseConfig.headers(),
      })
      .pipe(map((result) => result[0]));
  }
}
