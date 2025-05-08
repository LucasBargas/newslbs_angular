import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContainerComponent } from "../../components/container/container.component";
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { INews } from '../../interfaces/INews';
import { LoadingComponent } from "../../components/loading/loading.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPenToSquare, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
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
  allNews: INews[] = [];
  displayedNews: INews[] = [];
  isLoading = false;
  page = 1;
  itemsPerPage = 9;
  showLoadMoreButton = true;

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
    this.newsService.isLoading$.subscribe(loading => this.isLoading = loading);

    this.newsService.getFavoritesNews().subscribe((news) => {
      this.allNews = news;
      this.displayedNews = this.allNews.slice(0, this.itemsPerPage);
      this.updateLoadMoreVisibility();
    });
  }

  loadMore(): void {
    this.page++;
    this.displayedNews = this.allNews.slice(0, this.page * this.itemsPerPage);
    this.updateLoadMoreVisibility();
  }

  updateLoadMoreVisibility(): void {
    this.showLoadMoreButton = this.displayedNews.length < this.allNews.length;
  }

  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy', 'UTC');
  }

  toggleFavorite(newsItem: INews): void {
    newsItem.favorite = !newsItem.favorite;
    this.newsService.changeFavorite(newsItem).subscribe();
    this.removeFromListsIfNeeded(newsItem);
  }

  onDeleteClick(newsItem: INews): void {
    this.newsService.exclude(newsItem.id).subscribe();
    this.removeFromListsIfNeeded(newsItem);
  }

  removeFromListsIfNeeded(newsItem: INews): void {
    this.allNews = this.allNews.filter(item => item.id !== newsItem.id);
    this.displayedNews = this.displayedNews.filter(item => item.id !== newsItem.id);
    this.updateLoadMoreVisibility();
  }
}
