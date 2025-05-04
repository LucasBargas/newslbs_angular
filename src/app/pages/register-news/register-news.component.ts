import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContainerComponent } from "../../components/container/container.component";
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
@Component({
  selector: 'app-register-news',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './register-news.component.html',
  styleUrl: './register-news.component.scss'
})
export class RegisterNewsComponent implements OnInit {
  form!: FormGroup;
  categoryValue: string = '';

  constructor(private formBuilder: FormBuilder, private newsService: NewsService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required, // required field
        Validators.pattern(/(.|\s)*\S(.|\s)*/) // field not to be empty
      ])],
      description: ['', Validators.compose([
        Validators.required, // required field
        Validators.minLength(3)
      ])],
      category: [this.categoryValue, Validators.compose([
        Validators.required, // required field
      ])],
      author: ['', Validators.compose([
        Validators.required, // required field
      ])],
      favorite: [false],
      created_at: [new Date().toISOString().split('.')[0] + 'Z'],
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Força exibir erros
      return;
    }

    console.log('Form enviado:', this.form.value);
    this.form.reset();

    // const titleValue = this.form.get('title')?.value;
    // console.log('Título:', titleValue);
    // this.form.get('title')?.reset();
    // console.log(this.form.value)
    // this.newsService.register(this.form.value).subscribe();
  }

  hasError(field: string, error: string) {
    const control = this.form.get(field);
    return control?.hasError(error) && (control?.touched || control?.dirty);
  }
}
