import { CommonModule } from '@angular/common';
import { Component, Input, Optional, SkipSelf } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderNavSearchComponent } from './header-nav-search/header-nav-search.component';
import { HeaderComponent } from '../header.component';

interface INav {
  title: string;
  path?: string;
  secondPath?: string;
}

@Component({
  selector: 'app-header-nav',
  imports: [CommonModule, HeaderNavSearchComponent, RouterLink, RouterLinkActive],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss'
})
export class HeaderNavComponent {
  @Input() mobile!: boolean;

  navList: INav[] = [
    { title: 'Home', path: '/home' },
    { title: 'Notícias favoritas', path: '/noticias-favoritas' },
    { title: 'Cadastrar notícias', path: '/cadastrar-noticias' },
  ];

  // Buscando no componente pai HeaderComponent o método onClickMobleButton
  // para que o filho HeaderNavComponent possa usar
  constructor(@Optional() @SkipSelf() private header: HeaderComponent) {}

  onClick() {
    this.header.onClickMobleButton();
  }
}
