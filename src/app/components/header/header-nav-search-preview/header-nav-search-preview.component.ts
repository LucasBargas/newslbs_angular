import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input, OnChanges, Optional, SimpleChanges, SkipSelf, ViewChild } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { INews } from '../../../interfaces/INews';
import { RouterLink } from '@angular/router';
import { HeaderNavSearchComponent } from '../header-nav-search/header-nav-search.component';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-header-nav-search-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-nav-search-preview.component.html',
  styleUrl: './header-nav-search-preview.component.scss'
})
export class HeaderNavSearchPreviewComponent implements OnChanges {
  @ViewChild('previewRef') previewRef!: ElementRef;
  value = input<string>();
  error = input<boolean>();
  news!: INews[];
  isLoading = false;

  constructor(
    private newsService: NewsService,
    @Optional() @SkipSelf() private headerNavSearchComponent: HeaderNavSearchComponent,
    @Optional() @SkipSelf() private headerComponent: HeaderComponent
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
    this.headerNavSearchComponent.onClickClearButton();
    this.headerComponent.onClickMobileButton();
  }

  // Listen to all clicks in the document
  @HostListener('document:click', ['$event'])
  outsideClick(event: MouseEvent) {
    const clickedInside = this.previewRef?.nativeElement.contains(event.target);
    if (!clickedInside) this.onClick();
  }
}
