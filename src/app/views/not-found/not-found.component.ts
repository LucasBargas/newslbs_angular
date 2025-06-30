import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { ErrorComponent } from '../../components/error/error.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ErrorComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
