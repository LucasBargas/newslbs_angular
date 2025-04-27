import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from "../../components/container/container.component";
import { INews } from '../../interfaces/INews';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HomePaginationComponent } from '../../components/home-pagination/home-pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ContainerComponent, HomePaginationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // ✅ corrigido
})
export class HomeComponent implements OnInit {
  news!: INews;
  isLoading = false;
  currentPage: number = 1;
  itensPerPage: number = 6;
  totalPages: number = 0;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const page = params['pagina'];
      this.currentPage = page !== undefined ? page : 1;
      this.getNewsSerice();
    });

  }

  getNewsSerice() {
    this.newsService.isLoading$.subscribe(loading => this.isLoading = loading);

    this.newsService.getNews(this.itensPerPage, this.currentPage).subscribe({
      next: (news) => {
        this.news = news,
        this.totalPages = news.pages;
        console.log(this.news.data);
      },
      error: (err) => console.error('Erro ao carregar notícias', err)
    });
  }
}
