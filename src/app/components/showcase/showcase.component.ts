import { Component, Input, OnInit } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { CommonModule } from '@angular/common';
import { INews } from '../../interfaces/INews';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, ContainerComponent, NewsCardComponent, RouterLink],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent implements OnInit {
  news!: INews[];
  currentPage: number = 1;
  isLoading = false;
  @Input() favorites!: boolean;
  @Input() searchPage!: boolean;
  searchValue!: string;
  searchResultCount: number = 0;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getQueryParams();
  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      const page = params['pagina'];
      const search = params['q'];
      this.currentPage = page !== undefined ? page : 1;

      if (this.searchPage && search) {
        this.searchValue = search;
        this.newsService.getNewsBySearch(this.searchValue)
        .subscribe((news) => {
          console.log(news.length);
          this.searchResultCount = news.length;
        });
      }

      this.getNewsService();
    });
  }

  getNewsService() {
    this.newsService.isLoading$.subscribe(loading => this.isLoading = loading);

    this.newsService.getNews(this.searchValue, this.currentPage, this.favorites)
    .subscribe((news) => this.news = news);
  }
}
