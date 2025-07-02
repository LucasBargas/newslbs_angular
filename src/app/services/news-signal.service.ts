import { inject, Injectable, signal } from '@angular/core';
import { News } from '../models/news.model';
import { NewsService } from './news.service';
import { DeleteService } from './delete-service.service';
import { CategoriesSignalService } from './categories-signal.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NewsSignalService {
  private _router = inject(Router);
  private _categoriesSignal = inject(CategoriesSignalService);
  private _newsList = signal<News[]>([]);
  readonly newsList = this._newsList;
  private _orderCode = signal<'aleat' | 'asc' | 'desc'>('aleat');
  readonly orderCode = this._orderCode;
  private _orderName = signal<string>('Aleatórias');
  readonly orderName = this._orderName;
  private _isFavoriteNews = signal<boolean>(false);
  readonly isFavoriteNews = this._isFavoriteNews;
  private _isLoading = signal<boolean>(true);
  readonly isLoading = this._isLoading;
  private _hasNews = signal<boolean>(true);
  readonly hasNews = this._hasNews;
  private _queryValue = signal<string>('');
  readonly queryValue = this._queryValue;

  constructor(
    private newsService: NewsService,
    private deleteService: DeleteService,
  ) {
    this.newsService.loading$.subscribe((loading) =>
      this._isLoading.set(loading),
    );
  }

  loadNews(search: string): void {
    this.newsService
      .getAllNews(search, this._orderCode(), this._isFavoriteNews())
      .subscribe({
        next: (news) => {
          this._hasNews.set(true);
          this._newsList.set(news);
          if (news.length === 0) this._hasNews.set(false);
        },
        error: (error) => {
          console.error('Erro ao carregar as notícias:', error);
          this._hasNews.set(false);
        },
      });
  }

  deleteNews(id: number, currentUrl: string): void {
    this.deleteService.deleteById('news', id).subscribe({
      next: () => {
        this.loadNews(this._categoriesSignal.category());
        if (
          currentUrl.includes('/noticias-favoritas/') ||
          currentUrl.includes('/home/')
        )
          return;

        if (currentUrl.includes('/noticia/')) {
          this._router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Erro ao deletar:', error);
      },
    });
  }

  setIsFavoriteNews(value: boolean): void {
    this._isFavoriteNews.set(value);
  }

  setOrderCode(order: 'aleat' | 'asc' | 'desc'): void {
    this._orderCode.set(order);
  }

  setOrderName(orderName: string): void {
    this._orderName.set(orderName);
  }

  setQueryValue(query: string): void {
    this._queryValue.set(query);
  }
}
