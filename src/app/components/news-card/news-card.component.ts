import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INews } from '../../interfaces/INews';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye  } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare  } from '@fortawesome/free-solid-svg-icons';
import { faTrash  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  @Input() news!: INews[];
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  constructor(private newsService: NewsService) {}

  onDeleteClick(id: number) {
    const newsCopy = [...this.news];
    const newsCopyFilter = newsCopy.filter(el => el.id !== id);

    this.news = newsCopyFilter;

    this.newsService.exclude(id).subscribe();
    window.location.reload();
  }
}
