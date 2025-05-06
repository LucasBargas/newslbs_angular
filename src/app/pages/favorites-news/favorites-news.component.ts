import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from '../../components/showcase/showcase.component';

@Component({
  selector: 'app-favorites-news',
  standalone: true,
  imports: [CommonModule, ShowcaseComponent],
  templateUrl: './favorites-news.component.html',
  styleUrl: './favorites-news.component.scss'
})
export class FavoritesNewsComponent {
  favorites: boolean = true;
  currentRoute: string = '/noticias-favoritas';
}
