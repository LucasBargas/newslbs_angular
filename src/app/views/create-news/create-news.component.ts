import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-news',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './create-news.component.html',
  styleUrl: './create-news.component.scss',
})
export class CreateNewsComponent {
  private _newsService = inject(NewsService);
  _routeSub?: Subscription;
  private _router = inject(Router);

  onRegisterNews(form: FormGroup): void {
    const newsData = form.value;

    this._newsService.postNews(newsData).subscribe({
      next: (createdNews) => {
        form.reset();
        this._router.navigate(['/noticia', createdNews.id]);
      },
      error: (err) => {
        console.error('Erro ao criar notícia:', err);
        this._router.navigate(['/']);
      },
    });
  }
}
