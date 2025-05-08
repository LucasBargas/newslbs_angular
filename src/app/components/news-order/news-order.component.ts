import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Optional, Output, SkipSelf, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown  } from '@fortawesome/free-solid-svg-icons';
import { INews } from '../../interfaces/INews';
import { ShowcaseComponent } from '../showcase/showcase.component';

@Component({
  selector: 'app-news-order',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './news-order.component.html',
  styleUrl: './news-order.component.scss'
})
export class NewsOrderComponent {
  @ViewChild('navOptionsRef') navOptionsRef!: ElementRef;
  @Input() news!: INews[];
  @Input() order: string = '';
  @Output() orderChange = new EventEmitter<string>();

  showOrderList: boolean = false;

  orderOptions = [
    {
      name: 'Aleatório',
      order: ''
    },
    {
      name: 'Mais recentes',
      order: 'desc'
    },
    {
      name: 'Mais antigas',
      order: 'asc'
    },
  ]

  faChevronDown = faChevronDown;

  constructor(
    @Optional() @SkipSelf() private showcaseComponent: ShowcaseComponent
  ) {}

  changeOrder(newOrder: string) {
    this.orderChange.emit(newOrder);  // avisa o pai
    this.showOrderList = false;
    this.showcaseComponent.getNewsService();
  }

  @HostListener('document:click', ['$event'])
  outsideClick(event: MouseEvent) {
    if (!this.showOrderList) return;

    const clickedInside = this.navOptionsRef?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showOrderList = false;
    }
  }
}
