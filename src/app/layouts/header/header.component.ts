import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { HeaderMobileButtonComponent } from './header-mobile-button/header-mobile-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    HeaderLogoComponent,
    HeaderNavComponent,
    HeaderMobileButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  mobile = false;
  isScrolled = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 50;
  }
}
