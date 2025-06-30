import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { Form } from '../../models/form.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { FormCategoriesComponent } from './form-categories/form-categories.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { CategoriesSignalService } from '../../services/categories-signal.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    ReactiveFormsModule,
    ErrorMessageComponent,
    FormCategoriesComponent,
    FontAwesomeModule,
    LoadingComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit, OnDestroy {
  private _categoriesService = inject(CategoriesService);
  private _categoriesSignal = inject(CategoriesSignalService);
  private _formBuilder = inject(FormBuilder);
  formType = input.required<Form>();
  form!: FormGroup;
  getNewsById = output<FormGroup>();
  onEditNews = output<FormGroup>();
  onRegisterNews = output<FormGroup>();
  showCategoriesList: boolean = false;
  isLoading: boolean = true;
  private _loadingSub?: Subscription;
  faChevronDown = faChevronDown;

  constructor() {
    effect(() => {
      this.form = this._handleFormBuilder();
      if (this.formType() === 'edit') this.getNewsById.emit(this.form);

      this._categoriesSignal.loadCategories();
    });
  }

  get categoriesList(): Category[] {
    return this._categoriesSignal.categoriesList();
  }

  ngOnInit(): void {
    this._loadingSub = this._categoriesService.loading$.subscribe(
      (loading) => (this.isLoading = loading),
    );
  }

  ngOnDestroy(): void {
    this._loadingSub?.unsubscribe();
  }

  private _handleFormBuilder(): FormGroup {
    return this._formBuilder.group({
      title: ['', this._requiredMinLengthValidator(5)],
      description: ['', this._requiredMinLengthValidator(100)],
      category: ['', this._requiredMinLengthValidator(5)],
      author: ['', this._requiredMinLengthValidator(5)],
      isFavorite: [false],
    });
  }

  private _requiredMinLengthValidator(minLength: number): ValidatorFn | null {
    return Validators.compose([
      Validators.required,
      Validators.pattern(/^\s*\S.*$/),
      Validators.minLength(minLength),
    ]);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const categoryValue = this.form.get('category')?.value;
    const categoryRoute = categoryValue.toLowerCase().replace(/\s+/g, '-');

    const isCategoryExists = this.categoriesList.some(
      (category) => category.name === categoryValue,
    );

    if (!isCategoryExists) {
      this._categoriesService
        .postCategory({ name: categoryValue, categoryRoute: categoryRoute })
        .subscribe();
    }

    this.formType() === 'create'
      ? this.onRegisterNews.emit(this.form)
      : this.onEditNews.emit(this.form);
  }

  hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!(control?.hasError(error) && (control?.touched || control?.dirty));
  }
}
