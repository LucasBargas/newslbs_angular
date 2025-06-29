import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header-mobile-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-mobile-button.component.html',
  styleUrl: './header-mobile-button.component.scss',
})
export class HeaderMobileButtonComponent {
  mobile = input.required<boolean>();
  mobileChange = output<boolean>();

  onClick(): void {
    this.mobileChange.emit(!this.mobile());
  }
}
