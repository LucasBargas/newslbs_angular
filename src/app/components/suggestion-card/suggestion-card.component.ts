import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { News } from '../../models/news.model';
import { Router, RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import {
  faTrash,
  faPen,
  faHeart,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewsService } from '../../services/news.service';
import { NewsSignalService } from '../../services/news-signal.service';
import { CategoriesSignalService } from '../../services/categories-signal.service';

@Component({
  selector: 'app-suggestion-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './suggestion-card.component.html',
  styleUrl: './suggestion-card.component.scss',
})
export class SuggestionCardComponent {
  private _router = inject(Router);
  private _categoriesSignal = inject(CategoriesSignalService);
  private _newsService = inject(NewsService);
  news = input.required<News>();
  private _modalService = inject(ModalService);
  private _newsSignal = inject(NewsSignalService);
  faTrash = faTrash;
  faPen = faPen;
  faEye = faEye;
  notFavorited = faHeartRegular;
  favorited = faHeart;
  currentUrl!: string;

  ngOnInit(): void {
    this.currentUrl = this._router.url;
  }

  onDelete(): void {
    this._modalService.openModal('delete', this.news());
  }

  onFavorite(): void {
    const item = this.news();
    item.isFavorite = !item.isFavorite;

    this._newsService.updateNews(item.id.toString(), item).subscribe({
      next: () => {
        if (this.currentUrl.includes('/noticias-favoritas')) {
          this._newsSignal.loadNews(this._categoriesSignal.category());
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar notícia:', err);
      },
    });
  }
}
