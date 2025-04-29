import { Component } from '@angular/core';
import { ShowcaseComponent } from '../../components/showcase/showcase.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-news',
  imports: [CommonModule, ShowcaseComponent],
  templateUrl: './favorites-news.component.html',
  styleUrl: './favorites-news.component.scss'
})
export class FavoritesNewsComponent {
  favorites: boolean = true;
}
