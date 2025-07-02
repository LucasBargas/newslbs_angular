import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NewsSignalService } from '../../services/news-signal.service';
import { OrderControllerComponent } from '../../components/order-controller/order-controller.component';
import { CategoriesSignalService } from '../../services/categories-signal.service';
import { AsideNavComponent } from '../../components/aside-nav/aside-nav.component';
import { NewsDisplayComponent } from '../../components/news-display/news-display.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-favorite-news',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    LoadingComponent,
    OrderControllerComponent,
    RouterLink,
    RouterOutlet,
    AsideNavComponent,
    NewsDisplayComponent,
  ],
  templateUrl: './favorite-news.component.html',
  styleUrl: './favorite-news.component.scss',
})
export class FavoriteNewsComponent implements OnInit {
  private _router = inject(Router);
  private _newsSignal = inject(NewsSignalService);
  newsList = this._newsSignal.newsList;
  private _categoriesSignal = inject(CategoriesSignalService);
  category = this._categoriesSignal.category;
  categoriesLoading: boolean = true;
  private _title = inject(Title);

  constructor() {
    this._newsSignal.setIsFavoriteNews(true);
    this._newsSignal.setQueryValue('');

    effect(() => {
      if (this.category()) {
        this._title.setTitle(
          `NewsLBS | Notícias favoritas | ${this.category()}`,
        );
      } else {
        this._title.setTitle('NewsLBS | Notícias favoritas');
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.categoriesLoading = false;
    }, 600);

    const navEntries = performance.getEntriesByType(
      'navigation',
    ) as PerformanceNavigationTiming[];

    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
      this._router.navigate(['/noticias-favoritas']);
    }
  }
}
