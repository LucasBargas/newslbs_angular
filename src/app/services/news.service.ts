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
  public searchLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getNews(search: string | undefined, page: number, order?: string): Observable<INews[]> {
    this.isLoading$.next(true);
    const limit = 9;

    let params = new HttpParams()
    .set("_page", page)
    .set('_limit', limit)


    if (search!) {
      params = params.set('q', search!);
    }

    if (order) {
      params = params.set('_sort', 'createdAt').set('_order', order)
    }

    return this.http.get<INews[]>(this.apiUrl, { params }).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }

  getFavoritesNews(): Observable<INews[]> {
    this.isLoading$.next(true);

    let params = new HttpParams().set("favorite", true)

    return this.http.get<INews[]>(this.apiUrl, { params }).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }

  getAllNews(search?: string | undefined): Observable<INews[]> {
    let params = new HttpParams();

    if (search!) {
      params = params.set('q', search!);
    }

    return this.http.get<INews[]>(this.apiUrl, { params });
  }

  getNewsById(id: number): Observable<INews> {
    this.isLoading$.next(true);

    const url = `${this.apiUrl}/${id}`;

    return this.http.get<INews>(url).pipe(
      finalize(() => this.isLoading$.next(false))
    );
  }

  getNewsBySearch(search: string) {
    this.searchLoading$.next(true);

    let params = new HttpParams()
    .set("q", search.replace(/^\s+/, ''));

    return this.http.get<INews[]>(this.apiUrl, { params }).pipe(
      finalize(() => this.searchLoading$.next(false))
    );;
  }

  changeFavorite(news: INews): Observable<INews> {
    const url = `${this.apiUrl}/${news.id}`;
    return this.http.put<INews>(url, news);
  }

  register(news: INews): Observable<INews> {
    return this.http.post<INews>(this.apiUrl, news);
  }

  edit(news: INews): Observable<INews> {
    const url = `${this.apiUrl}/${news.id}`;
    return this.http.put<INews>(url, news);
  }

  exclude(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
