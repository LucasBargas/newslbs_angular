import { Component, effect, inject, input } from '@angular/core';
import { NewsSignalService } from '../../services/news-signal.service';
import { CommonModule } from '@angular/common';
import { SuggestionCardComponent } from '../suggestion-card/suggestion-card.component';
import { CategoriesSignalService } from '../../services/categories-signal.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-news-display',
  standalone: true,
  imports: [CommonModule, SuggestionCardComponent, LoadingComponent],
  templateUrl: './news-display.component.html',
  styleUrl: './news-display.component.scss',
})
export class NewsDisplayComponent {
  private _categoriesSignal = inject(CategoriesSignalService);
  category = this._categoriesSignal.category;
  private _newsSignal = inject(NewsSignalService);
  newsList = this._newsSignal.newsList;
  newsLoading = this._newsSignal.isLoading;
  query = input<string>();

  constructor() {
    effect(() => {
      const query = this.query()!;
      query
        ? this._newsSignal.loadNews(query)
        : this._newsSignal.loadNews(this.category());
    });
  }
}
