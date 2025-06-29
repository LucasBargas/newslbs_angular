import { CommonModule } from '@angular/common';
import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { CategoriesSignalService } from '../../services/categories-signal.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Category } from '../../models/category.model';
import { ScrollHelper } from '../../helpers/scroll.helper';

@Component({
  selector: 'app-aside-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './aside-nav.component.html',
  styleUrl: './aside-nav.component.scss',
})
export class AsideNavComponent implements OnInit, OnDestroy {
  private _categoriesSignal = inject(CategoriesSignalService);
  categoriesList = this._categoriesSignal.categoriesList;
  path = input.required<string>();

  ngOnInit(): void {
    this._categoriesSignal.loadCategories();
  }

  ngOnDestroy(): void {
    this.onReset();
  }

  onClick(item: Category): void {
    this._categoriesSignal.setCategory(item.name);
    ScrollHelper.scrollToTop();
  }

  onReset(): void {
    this._categoriesSignal.setCategory('');
  }
}
