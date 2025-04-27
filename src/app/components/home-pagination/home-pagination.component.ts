import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight  } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-pagination',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './home-pagination.component.html',
  styleUrl: './home-pagination.component.scss'
})
export class HomePaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
}
