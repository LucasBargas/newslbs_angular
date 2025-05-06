import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContainerComponent } from "../../components/container/container.component";
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown  } from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from '../../services/categories.service';
import { ICategories } from '../../interfaces/ICategories';

@Component({
  selector: 'app-edit-news',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './edit-news.component.html',
  styleUrl: './edit-news.component.scss'
})
export class EditNewsComponent implements OnInit {
  form!: FormGroup;
  categoriesList!: ICategories[];
  showCategoriesList: boolean = false;
  faChevronDown = faChevronDown;
  @ViewChild('categoriesListRef') categoriesListRef!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private newsService: NewsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const newsId = this.route.snapshot.paramMap.get('id');

    this.newsService.getNewsById(Number(newsId)).subscribe((news) => {
      this.form = this.handleFormBuilder(news.id, news.title, news.description, news.category, news.author, news.favorite)
    })

    this.categoriesService.getCaregories().subscribe((categories) => {
      this.categoriesList = categories;
    });
  }

  handleFormBuilder(id: number, title: string, description: string, category: string, author: string, favorite: boolean) {
    return this.formBuilder.group({
      id: [id],
      title: [title, Validators.compose([
        Validators.required, // required field
        Validators.pattern(/^\s*\S.*$/), // field not to be empty or spaces
        Validators.minLength(5)
      ])],
      description: [description, Validators.compose([
        Validators.required,
        Validators.pattern(/^\s*\S.*$/),
        Validators.minLength(100)
      ])],
      category: [category, Validators.compose([
        Validators.required,
        Validators.pattern(/^\s*\S.*$/),
        Validators.minLength(5)
      ])],
      author: [author, Validators.compose([
        Validators.required,
        Validators.pattern(/^\s*\S.*$/),
        Validators.minLength(5)
      ])],
      favorite: [favorite],
      createdAt: [new Date().toISOString().split('.')[0] + 'Z'],
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Show all the errors when forms is submitted
      return;
    }

    this.newsService.edit(this.form.value).subscribe();
    this.form.reset();
    this.router.navigate(['/home']);
  }

  hasError(field: string, error: string) {
    const control = this.form.get(field);
    return control?.hasError(error) && (control?.touched || control?.dirty);
  }

  onClick(item: ICategories, event: MouseEvent) {
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
