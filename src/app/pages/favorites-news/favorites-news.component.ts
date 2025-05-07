import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContainerComponent } from "../../components/container/container.component";
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { INews } from '../../interfaces/INews';
import { LoadingComponent } from "../../components/loading/loading.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye  } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare  } from '@fortawesome/free-solid-svg-icons';
import { faTrash  } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-favorites-news',
  standalone: true,
  imports: [CommonModule, ContainerComponent, RouterLink, LoadingComponent, FontAwesomeModule],
  templateUrl: './favorites-news.component.html',
  styleUrl: './favorites-news.component.scss',
  providers: [DatePipe]
})
export class FavoritesNewsComponent implements OnInit {
  news!: INews[];
  isLoading = false;
  faEye = faEye;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  notFavorited = faHeartRegular;
  favorited = faHeart;

  constructor(
    private newsService: NewsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.newsService.isLoading$
    .subscribe(loading => this.isLoading = loading);

    this.newsService.getFavoritesNews()
    .subscribe((news) => this.news = news);
  }

  handleWithDateAndHour(date: string) {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy', 'UTC');
    return formattedDate;
  }

  onFavoriteButtonClick(item: INews) {
    item.favorite = !item.favorite;
    this.newsService.changeFavorite(item).subscribe();
    this.handleWithCopyNews(item);
  }


  onDeleteClick(item: INews) {
    this.newsService.exclude(item.id).subscribe();
    this.handleWithCopyNews(item);
  }

  handleWithCopyNews(item: INews) {
    const newsCopy = Array.isArray(this.news) ? [...this.news] : [this.news];
    const newsCopyFilter = newsCopy.filter(el => el.id !== item.id);

    this.news = newsCopyFilter;
  }
}
