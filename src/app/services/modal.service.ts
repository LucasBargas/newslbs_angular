import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _isModalActive = signal<boolean>(false);
  private _item = signal<Category | News | undefined>(undefined);
  private _type = signal<'edit' | 'delete' | undefined>(undefined);

  readonly isModalActive = this._isModalActive;
  readonly item = this._item;
  readonly type = this._type;

  constructor() {}

  openModal(type: 'edit' | 'delete', item: Category | News): void {
    this._type.set(type);
    this._item.set(item);
    this._isModalActive.set(true);
  }

  closeModal(): void {
    this._isModalActive.set(false);
    this._item.set(undefined);
    this._type.set(undefined);
  }
}
