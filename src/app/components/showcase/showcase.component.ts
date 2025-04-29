import { Component, Input, OnInit } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { CommonModule } from '@angular/common';
import { INews } from '../../interfaces/INews';
import { NewsCardComponent } from '../news-card/news-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule, ContainerComponent, NewsCardComponent, PaginationComponent],
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent implements OnInit {
  news!: INews;
  currentPage: number = 1;
  totalPages: number = 0;
  isLoading = false;
  @Input() favorites!: boolean;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getQueryParams();
  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      const page = params['pagina'];
      this.currentPage = page !== undefined ? page : 1;
      this.getNewsSerice();
    });
  }

  getNewsSerice() {
    this.newsService.isLoading$.subscribe(loading => this.isLoading = loading);

    this.newsService.getNews(this.currentPage, this.favorites).subscribe({
      next: (news) => {
        this.news = news,
        this.totalPages = news.pages;
      },
      error: (err) => console.error('Erro ao carregar notícias', err)
    });
  }
}
