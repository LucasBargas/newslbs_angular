import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { INews } from '../interfaces/INews';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/news';
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getNews(search: string | undefined, page: number, favorites?: boolean): Observable<INews[]> {
    this.isLoading$.next(true);
    const limit = 9;

    let params = new HttpParams()
    .set("_page", page)
    .set('_limit', limit);

    if (favorites) {
      params = params.set('favorite', favorites);
    }

    if (search!) {
      params = params.set('q', search!);
    }

    return this.http.get<INews[]>(this.apiUrl, { params }).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }

  getNewsBySearch(search: string) {
    let params = new HttpParams()
    .set("q", search);

    return this.http.get<INews[]>(this.apiUrl, { params }).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }

  exclude(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
