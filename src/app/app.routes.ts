import { Routes } from '@angular/router';
import { NewsListComponent } from './views/news-list/news-list.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { FavoriteNewsComponent } from './views/favorite-news/favorite-news.component';
import { CreateNewsComponent } from './views/create-news/create-news.component';
import { EditNewsComponent } from './views/edit-news/edit-news.component';
import { NewsDetailsComponent } from './views/news-details/news-details.component';
import { SearchComponent } from './views/search/search.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: NewsListComponent,
    children: [
      {
        path: ':category',
        loadComponent: () =>
          import('./components/news-display/news-display.component').then(
            (m) => m.NewsDisplayComponent,
          ),
      },
    ],
  },
  {
    path: 'noticias-favoritas',
    component: FavoriteNewsComponent,
    children: [
      {
        path: ':category',
        loadComponent: () =>
          import('./components/news-display/news-display.component').then(
            (m) => m.NewsDisplayComponent,
          ),
      },
    ],
  },
  {
    path: 'cadastrar-noticia',
    component: CreateNewsComponent,
  },
  {
    path: 'editar-noticia/:id',
    component: EditNewsComponent,
  },
  {
    path: 'noticia/:id',
    component: NewsDetailsComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
