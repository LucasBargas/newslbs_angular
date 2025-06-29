import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSquareInstagram,
  faSquareFacebook,
  faSquareGithub,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header-nav-socials',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header-nav-socials.component.html',
  styleUrl: './header-nav-socials.component.scss',
})
export class HeaderNavSocialsComponent {
  faSquareInstagram = faSquareInstagram;
  faSquareFacebook = faSquareFacebook;
  faSquareGithub = faSquareGithub;
}
