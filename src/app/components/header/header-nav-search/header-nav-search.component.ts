import { CommonModule } from '@angular/common';
import { Component, Input, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
import { HeaderComponent } from '../header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-nav-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorMessageComponent, FontAwesomeModule],
  templateUrl: './header-nav-search.component.html',
  styleUrl: './header-nav-search.component.scss'
})
export class HeaderNavSearchComponent {
  @Input() mobile!: boolean;
  error: boolean = false;
  value: string = '';
  faMagnifyingGlass = faMagnifyingGlass

  constructor(
    private router: Router,
    @Optional() @SkipSelf() private header: HeaderComponent
  ) { }

  onSubmit() {
    if (!this.value.trim()) {
      this.error = true;
      return;
    }

    this.router.navigate(
      ['/search'],
      { queryParams: { q: this.value.replace(/^\s+/, '') } }
    );

    this.value = '';
    this.error = false;
    this.mobile && this.header.onClickMobileButton();
  }
}

