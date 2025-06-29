import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NewsSignalService } from '../../services/news-signal.service';
import { OrderControllerComponent } from '../../components/order-controller/order-controller.component';
import { CategoriesSignalService } from '../../services/categories-signal.service';
import { AsideNavComponent } from '../../components/aside-nav/aside-nav.component';
import { NewsDisplayComponent } from '../../components/news-display/news-display.component';

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
  private _newsSignal = inject(NewsSignalService);
  newsList = this._newsSignal.newsList;
  private _categoriesSignal = inject(CategoriesSignalService);
  category = this._categoriesSignal.category;
  categoriesLoading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.categoriesLoading = false;
    }, 600);

    this._newsSignal.setIsFavoriteNews(true);
  }
}
