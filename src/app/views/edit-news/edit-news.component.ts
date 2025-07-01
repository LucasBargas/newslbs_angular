import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { Subscription } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-news',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './edit-news.component.html',
  styleUrl: './edit-news.component.scss',
})
export class EditNewsComponent implements OnDestroy {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _newsService = inject(NewsService);
  _routeSub?: Subscription;
  private _title = inject(Title);

  ngOnDestroy(): void {
    this._routeSub?.unsubscribe();
  }

  getNewsById(form: FormGroup): void {
    this._routeSub = this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this._title.setTitle(`NewsLBS | Editar Notícia | ${id}`);
        this._newsService.getNewsById(id).subscribe({
          next: (res) => {
            if (res) {
              form.patchValue(res); // To fill the form with the news data
            } else {
              this._router.navigate(['/nao-existe']);
            }
          },
          error: (err) => {
            console.error('Erro ao carregar notícia:', err);
            this._router.navigate(['/nao-existe']);
          },
        });
      }
    });
  }

  onEditNews(form: FormGroup): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('ID não encontrado na URL.');
      return;
    }

    const { isFavorite, ...newsData } = form.value;

    this._newsService.updateNews(id, newsData).subscribe({
      next: () => {
        this._router.navigate(['/noticia', id]);
      },
      error: (err) => {
        console.error('Erro ao atualizar notícia:', err);
        this._router.navigate(['/']);
      },
    });
  }
}
