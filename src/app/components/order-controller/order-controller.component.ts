import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
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
export class OrderControllerComponent {
  @ViewChild('order') orderRef!: ElementRef;
  @ViewChild('toggleBtn') toggleBtnRef!: ElementRef;
  private _categoriesSignal = inject(CategoriesSignalService);
  category = this._categoriesSignal.category;
  private _newsSignal = inject(NewsSignalService);
  orderCode = this._newsSignal.orderCode;
  orderName = this._newsSignal.orderName;
  query = this._newsSignal.queryValue;
  orderActive = false;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  orderOptions: Order[] = ORDER_OPTIONS;

  defineOrder(item: Order): void {
    this._newsSignal.setOrderCode(item.code);
    this._newsSignal.setOrderName(item.name);

    if (this.category()) {
      this._newsSignal.loadNews(this.category());
    } else {
      this._newsSignal.loadNews(this.query());
    }

    this.toggleOrder();
  }

  toggleOrder(): void {
    this.orderActive = !this.orderActive;
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
