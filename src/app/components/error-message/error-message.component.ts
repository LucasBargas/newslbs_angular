import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  @Input() message!: string;
}
