import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NewsSignalService } from '../../services/news-signal.service';
import { Order } from '../../models/order.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ORDER_OPTIONS } from '../../constants/order-options.constant';
import { CategoriesSignalService } from '../../services/categories-signal.service';

@Component({
  selector: 'app-order-controller',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './order-controller.component.html',
  styleUrl: './order-controller.component.scss',
})
export class OrderControllerComponent implements OnDestroy {
  @ViewChild('order') orderRef!: ElementRef;
  @ViewChild('toggleBtn') toggleBtnRef!: ElementRef;
  private _categoriesSignal = inject(CategoriesSignalService);
  category = this._categoriesSignal.category;
  private _newsSignal = inject(NewsSignalService);
  orderCode = this._newsSignal.orderCode;
  orderName = this._newsSignal.orderName;
  orderActive = false;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  orderOptions: Order[] = ORDER_OPTIONS;

  defineOrder(item: Order): void {
    this._newsSignal.setOrderCode(item.code);
    this._newsSignal.setOrderName(item.name);
    this._newsSignal.loadNews(this.category());
    this.toggleOrder();
  }

  toggleOrder(): void {
    this.orderActive = !this.orderActive;
  }

  ngOnDestroy(): void {
    this._newsSignal.setOrderCode('aleat');
    this._newsSignal.setOrderName('Aleatórias');
  }

  @HostListener('document:click', ['$event'])
  outsideClick(event: MouseEvent): void {
    const clickedInsideOrder = this.orderRef?.nativeElement.contains(
      event.target,
    );
    const clickedToggleBtn = this.toggleBtnRef?.nativeElement.contains(
      event.target,
    );

    if (!clickedInsideOrder && !clickedToggleBtn) {
      this.orderActive = false;
    }
  }
}
