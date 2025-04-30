import { Component } from '@angular/core';
import { ContainerComponent } from "../container/container.component";

@Component({
  selector: 'app-loading',
  imports: [ContainerComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

}
