import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NewsDisplayComponent } from '../../components/news-display/news-display.component';
import { NewsSignalService } from '../../services/news-signal.service';
import { ActivatedRoute } from '@angular/router';
import { ContainerComponent } from '../../components/container/container.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NewsDisplayComponent, ContainerComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private _newsSignal = inject(NewsSignalService);
  private route = inject(ActivatedRoute);
  query: string = '';

  ngOnInit(): void {
    this._newsSignal.setIsFavoriteNews(false);

    this.route.queryParams.subscribe((params) => {
      const searchQuery = params['q'];
      this.query = searchQuery;
    });
  }
}
