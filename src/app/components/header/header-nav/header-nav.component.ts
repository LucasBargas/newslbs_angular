import { CommonModule } from '@angular/common';
import { Component, Input, Optional, SkipSelf } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareInstagram  } from '@fortawesome/free-brands-svg-icons';
import { faSquareFacebook  } from '@fortawesome/free-brands-svg-icons';
import { HeaderNavSearchComponent } from '../header-nav-search/header-nav-search.component';

interface INav {
  title: string;
  path?: string;
  secondPath?: string;
}

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [CommonModule, HeaderNavSearchComponent, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss'
})
export class HeaderNavComponent {
  @Input() mobile!: boolean;
  faSquareInstagram = faSquareInstagram;
  faSquareFacebook = faSquareFacebook ;

  navList: INav[] = [
    { title: 'Home', path: '/home' },
    { title: 'Notícias favoritas', path: '/noticias-favoritas' },
    { title: 'Cadastrar notícias', path: '/cadastrar-noticia' },
  ];

  // Buscando no componente pai HeaderComponent o método onClickMobleButton
  // para que o filho HeaderNavComponent possa usar
  constructor(@Optional() @SkipSelf() private header: HeaderComponent) {}

  onClick() {
    this.mobile && this.header.onClickMobileButton();
  }
}
