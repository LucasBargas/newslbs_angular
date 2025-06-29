import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {}
