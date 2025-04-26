import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:3000/news';
  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getNews() {
    this.isLoading$.next(true);
    return this.http.get(this.apiUrl).pipe(
      finalize(() => this.isLoading$.next(false)) // desativa loading mesmo com erro
    );
  }
}
