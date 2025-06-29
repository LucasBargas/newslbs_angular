import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { News } from '../../models/news.model';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { faTrash, faPen, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-main-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './main-card.component.html',
  styleUrl: './main-card.component.scss',
})
export class MainCardComponent {
  private _newsService = inject(NewsService);
  private _modalService = inject(ModalService);
  news = input.required<News | null>();
  faTrash = faTrash;
  faPen = faPen;
  notFavorited = faHeartRegular;
  favorited = faHeart;

  onDelete(): void {
    this._modalService.openModal('delete', this.news()!);
  }

  onFavorite(): void {
    const item = this.news()!;
    item.isFavorite = !item.isFavorite;

    this._newsService.updateNews(item.id.toString(), item).subscribe({
      error: (err) => {
        console.error('Erro ao atualizar notícia:', err);
      },
    });
  }
}
