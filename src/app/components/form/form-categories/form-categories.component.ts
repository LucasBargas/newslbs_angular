import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { Category } from '../../../models/category.model';
import { FormGroup } from '@angular/forms';
import { NormalizeHelper } from '../../../helpers/normalize.helper';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriesSignalService } from '../../../services/categories-signal.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-form-categories',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './form-categories.component.html',
  styleUrl: './form-categories.component.scss',
})
export class FormCategoriesComponent {
  @ViewChild('formCategories') formCategoriesRef!: ElementRef;
  private _modalService = inject(ModalService);
  categoriesList = inject(CategoriesSignalService).categoriesList;
  categoryChange = output<string>();
  showCategoriesListChange = output<boolean>();
  form = input.required<FormGroup>();
  faTrash = faTrash;
  faPen = faPen;

  constructor() {}

  get categorySelected(): string {
    return this.form().get('category')?.value || '';
  }

  isEquals(category: string): boolean {
    const normalizedSelected = NormalizeHelper.normalize(this.categorySelected);
    const normalizedCategory = NormalizeHelper.normalize(category);
    return normalizedSelected === normalizedCategory;
  }

  onDelete(item: Category): void {
    this._modalService.openModal('delete', item);
  }

  onEdit(item: Category): void {
    this._modalService.openModal('edit', item);
  }

  onClick(category: string): void {
    this.form().get('category')?.setValue(category);
    this.showCategoriesListChange.emit(false);
  }

  @HostListener('document:click', ['$event'])
  outsideClick(event: MouseEvent): void {
    const formElement = this.formCategoriesRef?.nativeElement;
    const clickedElement = event.target as HTMLElement;

    const clickedInsideForm = formElement?.contains(clickedElement);
    const clickedInsideModal = clickedElement.closest('.modal') !== null;
    const clickedCategoryInput =
      clickedElement.closest('input[name="category"]') !== null;

    if (!clickedInsideForm && !clickedInsideModal && !clickedCategoryInput) {
      this.showCategoriesListChange.emit(false);
    }
  }
}
