import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, Optional, SimpleChanges, SkipSelf } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { INews } from '../../../interfaces/INews';
import { RouterLink } from '@angular/router';
import { HeaderNavSearchComponent } from '../header-nav-search/header-nav-search.component';

@Component({
  selector: 'app-header-nav-search-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-nav-search-preview.component.html',
  styleUrl: './header-nav-search-preview.component.scss'
})
export class HeaderNavSearchPreviewComponent implements OnChanges {
  @Input() value!: string;
  @Input() error!: boolean;
  news!: INews[];
  isLoading = false;

  constructor(
    private newsService: NewsService,
    @Optional() @SkipSelf() private header: HeaderNavSearchComponent
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['value'];

    if (change && change.currentValue.length > 2) {
      this.newsService.searchLoading$.subscribe(loading => this.isLoading = loading);

      this.newsService.getNewsBySearch(change.currentValue).subscribe((data) => {
        this.news = data;
      });
    }
  }

  onClick() {
    this.header.onClickClearButton();
  }
}
