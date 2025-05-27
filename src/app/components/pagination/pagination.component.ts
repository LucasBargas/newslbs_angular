import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight  } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  currentPage = input<number>();
  totalPages = input<number>();
  currentRoute = input<string>();
  searchValue = input<string>();

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
}
