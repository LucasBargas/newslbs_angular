import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CategoriesSignalService } from '../../services/categories-signal.service';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { NewsSignalService } from '../../services/news-signal.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit, OnDestroy {
  private _modalService = inject(ModalService);
  private _router = inject(Router);
  private routerSub!: Subscription;
  private _categoriesSignals = inject(CategoriesSignalService);
  private _newsSignal = inject(NewsSignalService);
  isModalActive = this._modalService.isModalActive;
  item = this._modalService.item;
  type = this._modalService.type;
  isNews: boolean = false;
  faXmark = faXmark;
  category: string = '';
  error!: boolean;
  currentUrl!: string;

  constructor() {
    effect(() => {
      const item = this.item();
      this.isNews = item ? 'author' in item : false;

      if (
        !this.isNews &&
        item &&
        'name' in item &&
        item.name !== this.category
      ) {
        this.category = item.name;
      }
    });
  }

  ngOnInit(): void {
    this.currentUrl = this._router.url;

    this.routerSub = this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this._modalService.closeModal();
        this.currentUrl = event.url;
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  closeModal(): void {
    this._modalService.closeModal();
  }

  onDelete(): void {
    const item = this.item();

    if (!item?.id) return;

    if (!this.isNews) {
      this._categoriesSignals.deleteCategory(item.id);
    } else {
      const news = item as News;
      this._newsSignal.deleteNews(news.id, this.currentUrl);
    }
  }

  onEdit(): void {
    const trimmedName = this.category.trim();

    if (!trimmedName || trimmedName.length < 5) {
      this.error = true;
      return;
    }

    this.error = false;

    const item = this.item();
    if (!item?.id) return;

    this._categoriesSignals.editCategory(item.id, { name: trimmedName });
    this.closeModal();
  }

  confirmModal(): void {
    switch (this.type()) {
      case 'delete':
        this.onDelete();
        this.closeModal();
        break;
      case 'edit':
        this.onEdit();
        break;
    }
  }

  outsideClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
