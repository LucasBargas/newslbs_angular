import { Component, Input, OnInit } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { CommonModule } from '@angular/common';
import { INews } from '../../interfaces/INews';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown  } from '@fortawesome/free-solid-svg-icons';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ContainerComponent, NewsCardComponent, RouterLink, LoadingComponent, PaginationComponent],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent implements OnInit {
  news!: INews[];
  currentPage: number = 1;
  totalPages!: number;
  @Input() currentRoute!: string;
  isLoading = false;
  @Input() favorites!: boolean;
  @Input() searchPage!: boolean;
  viewNews: boolean = true;
  searchValue!: string;
  searchResultCount: number = 0;
  faChevronDown = faChevronDown;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getQueryParams();

    this.route.queryParams.subscribe(params => {
      const search = params['q'];

      this.newsService.getAllNews(search, this.favorites).subscribe((news) => {
        this.totalPages = Math.ceil(news.length / 9);
      });
    });

  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      const page = params['pagina'];
      const search = params['q'];
      this.currentPage = page !== undefined ? Number(page) : 1;

      if (this.searchPage && search) {
        this.searchValue = search;
        this.newsService.getNewsBySearch(this.searchValue)
        .subscribe((news) => {
          this.searchResultCount = news.length;
        });
      }

      this.getNewsService();
    });
  }

  getNewsService() {
    this.newsService.isLoading$.subscribe(loading => this.isLoading = loading);

    this.newsService.getNews(this.searchValue, this.currentPage, this.favorites)
      .subscribe((news) => {
        this.news = news;
      });
  }
}
