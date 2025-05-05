import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContainerComponent } from "../../components/container/container.component";
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown  } from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from '../../services/categories.service';
import { ICategories } from '../../interfaces/ICategories';

@Component({
  selector: 'app-register-news',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './register-news.component.html',
  styleUrl: './register-news.component.scss'
})
export class RegisterNewsComponent implements OnInit {
  form!: FormGroup;
  categoriesList!: ICategories[];
  showCategoriesList: boolean = false;
  faChevronDown = faChevronDown;
  @ViewChild('categoriesListRef') categoriesListRef!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private newsService: NewsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required, // required field
        Validators.pattern(/^\s*\S.*$/), // field not to be empty or spaces
        Validators.minLength(5)
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^\s*\S.*$/),
        Validators.minLength(100)
      ])],
      category: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^\s*\S.*$/),
        Validators.minLength(5)
      ])],
      author: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^\s*\S.*$/),
        Validators.minLength(5)
      ])],
      favorite: [false],
      created_at: [new Date().toISOString().split('.')[0] + 'Z'],
    })

    this.categoriesService.getCaregories().subscribe((categories) => {
      this.categoriesList = categories;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Show all the errors when forms is submitted
      return;
    }

    console.log('Form enviado:', this.form.value);
    this.newsService.register(this.form.value).subscribe();
    this.form.reset();
    this.router.navigate(['/home']);
  }

  hasError(field: string, error: string) {
    const control = this.form.get(field);
    return control?.hasError(error) && (control?.touched || control?.dirty);
  }

  onClick(item: ICategories, event: MouseEvent) {
    event.stopPropagation(); // Prevents the click from reaching the HostListener
    this.form.get('category')?.setValue(item.category);
    this.showCategoriesList = false;
  }

  // Listen to all clicks in the document
  @HostListener('document:click', ['$event'])
  outsideClick(event: MouseEvent) {
    if (!this.showCategoriesList) return;

    const clickedInside = this.categoriesListRef?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showCategoriesList = false;
    }
  }
}
