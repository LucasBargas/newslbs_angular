import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ContainerComponent } from '../../components/container/container.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { INews } from '../../interfaces/INews';
import { NewsCardComponent } from "../../components/news-card/news-card.component";

@Component({
  selector: 'app-news-single',
  standalone: true,
  imports: [CommonModule, ContainerComponent, NewsCardComponent],
  templateUrl: './news-single.component.html',
  styleUrl: './news-single.component.scss'
})
export class NewsSingleComponent implements OnInit {
  news!: INews[];
  favorites!: boolean;
  viewNews = false;

  constructor (private newsService: NewsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.newsService.getNewsById(Number(id)).subscribe((news) => {
        this.news = [news];
      });
    });
  }
}
