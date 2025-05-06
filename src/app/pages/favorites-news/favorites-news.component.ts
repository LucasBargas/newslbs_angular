import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContainerComponent } from "../../components/container/container.component";
import { RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { INews } from '../../interfaces/INews';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-favorites-news',
  standalone: true,
  imports: [CommonModule, ContainerComponent, RouterLink, LoadingComponent],
  templateUrl: './favorites-news.component.html',
  styleUrl: './favorites-news.component.scss',
  providers: [DatePipe]
})
export class FavoritesNewsComponent implements OnInit {
  news!: INews[];
  isLoading = false;

  constructor(private newsService: NewsService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.newsService.isLoading$.subscribe(loading => this.isLoading = loading);

    this.newsService.getFavoritesNews().subscribe((news) => {
      this.news = news;
    })
  }

  handleWithDateAndHour(date: string) {
    const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy HH:mm', 'UTC');
    return formattedDate;
  }
}
