import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { ContainerComponent } from '../../components/container/container.component';
import { MainCardComponent } from '../../components/main-card/main-card.component';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    MainCardComponent,
    LoadingComponent,
  ],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss',
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _newsService = inject(NewsService);
  news: News | null = null;
  _routeSub?: Subscription;
  isLoading: boolean = true;
  private _title = inject(Title);

  ngOnInit(): void {
    this._routeSub = this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this._title.setTitle(`NewsLBS | Notícia | ${id}`);
        this._fetchNewsById(id);
      }
    });

    this._newsService.loading$.subscribe(
      (loading) => (this.isLoading = loading),
    );
  }

  ngOnDestroy(): void {
    this._routeSub?.unsubscribe();
  }

  private _fetchNewsById(id: string): void {
    this._newsService.getNewsById(id).subscribe({
      next: (res) => {
        if (res) {
          this.news = res;
        } else {
          this._router.navigate(['/nao-existe']);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar notícia:', err);
        this._router.navigate(['/nao-existe']);
      },
    });
  }
}
