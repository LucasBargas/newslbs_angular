import { CommonModule } from '@angular/common';
import { Component, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from '../../../error-message/error-message.component';
import { HeaderComponent } from '../../header.component';

@Component({
  selector: 'app-header-nav-search',
  imports: [CommonModule, FormsModule, ErrorMessageComponent],
  templateUrl: './header-nav-search.component.html',
  styleUrl: './header-nav-search.component.scss'
})
export class HeaderNavSearchComponent {
  error: boolean = false;
  value: string = '';

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
    this.header.onClickMobleButton();
  }
}

