import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from '../../components/showcase/showcase.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ShowcaseComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  favorites!: boolean;
  searchPage = true;
  currentRoute = "/search";
}
