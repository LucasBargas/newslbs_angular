import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  OnDestroy,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import { News } from '../../../../../models/news.model';
import { RouterLink } from '@angular/router';
import { HeaderNavComponent } from '../../header-nav.component';
import { HeaderNavSearchComponent } from '../header-nav-search.component';
import { NewsService } from '../../../../../services/news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-nav-search-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-nav-search-preview.component.html',
  styleUrl: './header-nav-search-preview.component.scss',
})
export class HeaderNavSearchPreviewComponent implements OnInit, OnDestroy {
  newsList = input.required<News[]>();
  search = input.required<string>();
  isLoading = false;
  private _loadingSub?: Subscription;

  constructor(
    @Optional() @SkipSelf() private headerNav: HeaderNavComponent,
    @Optional()
    @SkipSelf()
    private headerNavSearch: HeaderNavSearchComponent,
    private newsService: NewsService,
  ) {}

  ngOnInit(): void {
    this._loadingSub = this.newsService.searchLoading$.subscribe(
      (loading) => (this.isLoading = loading),
    );
  }

  ngOnDestroy(): void {
    this._loadingSub?.unsubscribe();
  }

  onClick(): void {
    this.headerNav.onClick();
    this.headerNavSearch.clear();
  }
}
