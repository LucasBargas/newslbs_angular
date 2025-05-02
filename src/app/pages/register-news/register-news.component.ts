import { Component } from '@angular/core';
import { ContainerComponent } from "../../components/container/container.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-news',
  standalone: true,
  imports: [CommonModule, ContainerComponent],
  templateUrl: './register-news.component.html',
  styleUrl: './register-news.component.scss'
})
export class RegisterNewsComponent {

}
