import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from "../../components/container/container.component";
import { INews } from '../../interfaces/INews';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // ✅ corrigido
})
export class HomeComponent implements OnInit {
  news: INews[] = [];
  isLoading = false;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.isLoading$.subscribe(loading => this.isLoading = loading);

    this.newsService.getNews().subscribe({
      next: (data) => {
        this.news = data,
        console.log('Notícias carregadas com sucesso', this.news);
      },
      error: (err) => console.error('Erro ao carregar notícias', err)
    });
  }
}
