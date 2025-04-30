import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INews } from '../../interfaces/INews';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye  } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare  } from '@fortawesome/free-solid-svg-icons';
import { faTrash  } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
  providers: [DatePipe]
})
export class NewsCardComponent {
  @Input() news!: INews[];
  @Input() favorites!: boolean;
  @Input() viewNews!: boolean;
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  notFavorited = faHeartRegular;
  favorited = faHeart;

  constructor(private newsService: NewsService, private datePipe: DatePipe) {}

  onDeleteClick(id: number) {
    const newsCopy = Array.isArray(this.news) ? [...this.news] : [this.news];
    const newsCopyFilter = newsCopy.filter(el => el.id !== id);

    this.news = newsCopyFilter;

    this.newsService.exclude(id).subscribe();

    if (!this.viewNews) {
      window.location.reload();
    }
  }

  onFavoriteButtonClick(item: INews) {
    item.favorite = !item.favorite;
    this.newsService.changeFavorite(item).subscribe();
    if (this.favorites) window.location.reload();
  }

  handleWithDateAndHour(date: string) {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy HH:mm', 'UTC');
    return formattedDate;
  }
}
