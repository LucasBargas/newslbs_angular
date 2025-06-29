import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollHelper } from '../../../helpers/scroll.helper';
import { CategoriesSignalService } from '../../../services/categories-signal.service';

@Component({
  selector: 'app-header-logo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-logo.component.html',
  styleUrl: './header-logo.component.scss',
})
export class HeaderLogoComponent {
  mobileChange = output<boolean>();
  private _categoriesSignal = inject(CategoriesSignalService);

  onClick(): void {
    this.mobileChange.emit(false);
    ScrollHelper.scrollToTop();
    this._categoriesSignal.setCategory('');
  }
}
