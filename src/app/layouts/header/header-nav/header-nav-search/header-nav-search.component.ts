import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  Optional,
  signal,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { HeaderNavComponent } from '../header-nav.component';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from '../../../../components/error-message/error-message.component';
import { NewsService } from '../../../../services/news.service';
import { HeaderNavSearchPreviewComponent } from './header-nav-search-preview/header-nav-search-preview.component';
import { News } from '../../../../models/news.model';
import { NormalizeHelper } from '../../../../helpers/normalize.helper';

@Component({
  selector: 'app-header-nav-search',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ErrorMessageComponent,
    HeaderNavSearchPreviewComponent,
  ],
  templateUrl: './header-nav-search.component.html',
  styleUrl: './header-nav-search.component.scss',
})
export class HeaderNavSearchComponent {
  @ViewChild('previewRef') previewRef!: ElementRef;
  @ViewChild('input') inputRef!: ElementRef;
  private _router = inject(Router);
  private _newsService = inject(NewsService);
  search = signal('');
  clearInput: boolean = false;
  error: boolean = false;
  isSearching = false;
  newsList!: News[];
  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;

  constructor(@Optional() @SkipSelf() private headerNav: HeaderNavComponent) {
    effect(() => {
      const term = NormalizeHelper.normalize(this.search());

      this.isSearching = term.trim().length > 2;

      if (term.trim().length < 2) return;

      this._newsService.searchNews(term).subscribe({
        next: (data) => {
          this.newsList = data;
        },
        error: (err) => {
          console.error('Erro na busca:', err);
        },
      });
    });
  }

  clear(): void {
    this.search.set('');
  }

  onSubmit(): void {
    if (!this.search().trim()) {
      this.error = true;
      return;
    }

    this.error = false;
    this.headerNav.onClick();
    this._router.navigate(['/search'], {
      queryParams: { q: this.search().trim() },
    });
    this.clear();
  }

  @HostListener('document:click', ['$event'])
  outsideClick(event: MouseEvent): void {
    setTimeout(() => {
      const target = event.target as Node;

      const clickedInsideInput = this.inputRef?.nativeElement.contains(target);
      const clickedInsidePreview =
        this.previewRef?.nativeElement.contains(target);

      if (!clickedInsideInput && !clickedInsidePreview) {
        this.isSearching = false;
      }
    });
  }
}
