import { HttpClient } from '@angular/common/http';
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

  getNews(): Observable<INews[]> {
    this.isLoading$.next(true);

    return this.http.get<INews[]>(this.apiUrl).pipe(
      finalize(() => this.isLoading$.next(false)) // desativa loading mesmo com erro
    );
  }
}
