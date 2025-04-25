import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../container/container.component';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './header-nav/header-nav.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, ContainerComponent, HeaderNavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  mobile: boolean = true;

  onClickMobleButton() {
    this.mobile = !this.mobile;
  }
}
