import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoriesService } from './categories.service';
import { DeleteService } from './delete-service.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesSignalService {
  private _categoriesList = signal<Category[]>([]);
  readonly categoriesList = this._categoriesList;
  private _category = signal<string>('');
  readonly category = this._category;

  constructor(
    private categoriesService: CategoriesService,
    private deleteService: DeleteService,
  ) {}

  loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        this._categoriesList.set(categories);
      },
      error: (error) => {
        console.error('Erro ao carregar as categorias:', error);
      },
    });
  }

  deleteCategory(id: number): void {
    this._categoriesList.update((prev) => prev.filter((cat) => cat.id !== id));

    this.deleteService.deleteById('categories', id).subscribe({
      error: (error) => {
        console.error('Erro ao deletar:', error);
      },
    });
  }

  editCategory(id: number, data: Partial<Category>): void {
    const oldList = this._categoriesList();

    this._categoriesList.update((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...data } : cat)),
    );

    this.categoriesService.updateCategory(id, data).subscribe({
      error: (error) => {
        console.error('Erro ao editar categoria:', error);
        this._categoriesList.set(oldList);
      },
    });
  }

  setCategory(value: string): void {
    this._category.set(value);
  }
}
