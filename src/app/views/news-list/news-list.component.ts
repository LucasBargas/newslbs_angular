import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { NewsSignalService } from '../../services/news-signal.service';
import { CategoriesSignalService } from '../../services/categories-signal.service';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { OrderControllerComponent } from '../../components/order-controller/order-controller.component';
import { AsideNavComponent } from '../../components/aside-nav/aside-nav.component';
import { NewsDisplayComponent } from '../../components/news-display/news-display.component';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    LoadingComponent,
    OrderControllerComponent,
    RouterOutlet,
    AsideNavComponent,
    NewsDisplayComponent,
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent {
  private _newsSignal = inject(NewsSignalService);
  newsList = this._newsSignal.newsList;
  private _categoriesSignal = inject(CategoriesSignalService);
  category = this._categoriesSignal.category;
  categoriesLoading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.categoriesLoading = false;
    }, 600);

    this._newsSignal.setIsFavoriteNews(false);
  }
}
