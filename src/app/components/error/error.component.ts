import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { CategoriesSignalService } from '../../services/categories-signal.service';
import { NewsSignalService } from '../../services/news-signal.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  private _newsSignal = inject(NewsSignalService);
  isFavorite = this._newsSignal.isFavoriteNews;
  hasNews = this._newsSignal.hasNews;
  private _categoriesSignal = inject(CategoriesSignalService);
  category = this._categoriesSignal.category;
  aPage = input<boolean>();

  get messageText(): string {
    const cat = this.category();
    const fav = this.isFavorite();
    let msg = 'Que tal cadastrar a primeira';

    if (cat) msg += ` na categoria <strong>"${cat}"</strong>`;
    if (fav) msg += cat ? ' e favoritá-la' : ' e favoritá-la';

    return msg + '?';
  }
}
