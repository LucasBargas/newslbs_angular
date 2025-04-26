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

  getNews(itensPerPage: number, page: number, favorites?: boolean, search?: string, author?: string): Observable<INews> {
    this.isLoading$.next(true);

    let params = new HttpParams()
    .set("_page", page)
    .set('_per_page', itensPerPage);

    if (favorites) {
      params = params.set('favorite', favorites);
    }

    if (search!) {
      params = params.set('q', search!);
    }

    if (author!) {
      params = params.set('q', author!);
    }

    return this.http.get<INews>(this.apiUrl, { params }).pipe(
      finalize(() => this.isLoading$.next(false)) // desativa loading mesmo com erro
    );
  }
}
