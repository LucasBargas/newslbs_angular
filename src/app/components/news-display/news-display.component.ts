import { Component, computed, effect, inject, input } from '@angular/core';
import { NewsSignalService } from '../../services/news-signal.service';
import { CommonModule } from '@angular/common';
import { SuggestionCardComponent } from '../suggestion-card/suggestion-card.component';
import { CategoriesSignalService } from '../../services/categories-signal.service';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-news-display',
  standalone: true,
  imports: [
    CommonModule,
    SuggestionCardComponent,
    LoadingComponent,
    ErrorComponent,
  ],
  templateUrl: './news-display.component.html',
  styleUrl: './news-display.component.scss',
})
export class NewsDisplayComponent {
  private _categoriesSignal = inject(CategoriesSignalService);
  category = this._categoriesSignal.category;
  private _newsSignal = inject(NewsSignalService);
  newsList = this._newsSignal.newsList;
  hasNews = this._newsSignal.hasNews;
  newsLoading = this._newsSignal.isLoading;
  query = this._newsSignal.queryValue;
  visibleCount: number = 4;

  constructor() {
    effect(() => {
      if (this.category()) {
        this._newsSignal.setQueryValue('');
        this._newsSignal.loadNews(this.category());
      } else {
        this._categoriesSignal.setCategory('');
        this._newsSignal.loadNews(this.query());
      }
    });
  }

  toggleParam = computed(() => this.query() ?? this.category());

  loadMore(): void {
    this.visibleCount += 4;
  }

  canLoadMore(): boolean {
    return this.newsList().length > this.visibleCount;
  }
}
