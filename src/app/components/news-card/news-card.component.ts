import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INews } from '../../interfaces/INews';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  @Input() news!: INews;

  constructor(private newsService: NewsService) {}

  onDeleteClick(id: number) {
    const newsCopy = [...this.news.data];
    const newsCopyFilter = newsCopy.filter(el => el.id !== id);

    const obj = {
      data: newsCopyFilter,
      pages: this.news.pages,
      items: this.news.items,
    }

    this.news = obj;

    this.newsService.exclude(id).subscribe();
    window.location.reload();
  }
}
