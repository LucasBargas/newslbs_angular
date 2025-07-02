import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NewsDisplayComponent } from '../../components/news-display/news-display.component';
import { NewsSignalService } from '../../services/news-signal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '../../components/container/container.component';
import { OrderControllerComponent } from '../../components/order-controller/order-controller.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    NewsDisplayComponent,
    ContainerComponent,
    OrderControllerComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private _router = inject(Router);
  private _newsSignal = inject(NewsSignalService);
  newsList = this._newsSignal.newsList;
  hasNews = this._newsSignal.hasNews;
  query = this._newsSignal.queryValue;
  private route = inject(ActivatedRoute);
  private _title = inject(Title);

  constructor() {
    this._title.setTitle('NewsLBS | Pesquisa');
    this._newsSignal.setIsFavoriteNews(false);

    this.route.queryParams.subscribe((params) => {
      const searchQuery = params['q'];
      if (!searchQuery) this._router.navigate(['/']);
      this._newsSignal.setQueryValue(searchQuery);
    });
  }
}
