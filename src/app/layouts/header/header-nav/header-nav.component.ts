import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { HeaderNavSearchComponent } from './header-nav-search/header-nav-search.component';
import { HeaderNavSocialsComponent } from './header-nav-socials/header-nav-socials.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Nav } from '../../../models/nav.model';
import { CategoriesSignalService } from '../../../services/categories-signal.service';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    HeaderNavSearchComponent,
    HeaderNavSocialsComponent,
  ],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss',
})
export class HeaderNavComponent {
  mobile = input.required<boolean>();
  mobileChange = output<boolean>();
  private _categoriesSignal = inject(CategoriesSignalService);

  navList: Nav[] = [
    { title: 'Home', path: '/home' },
    { title: 'Notícias favoritas', path: '/noticias-favoritas' },
    { title: 'Cadastrar notícia', path: '/cadastrar-noticia' },
  ];

  onClick(): void {
    this.mobileChange.emit(false);
    this._categoriesSignal.setCategory('');
  }
}
