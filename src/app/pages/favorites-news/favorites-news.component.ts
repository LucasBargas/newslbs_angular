import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from '../../components/showcase/showcase.component';
import { ContainerComponent } from "../../components/container/container.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites-news',
  standalone: true,
  imports: [CommonModule, ContainerComponent, RouterLink],
  templateUrl: './favorites-news.component.html',
  styleUrl: './favorites-news.component.scss'
})
export class FavoritesNewsComponent {

}
