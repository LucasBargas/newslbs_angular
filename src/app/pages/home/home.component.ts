import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from '../../components/showcase/showcase.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ShowcaseComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentRoute: string = '/home';
}
