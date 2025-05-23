import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesNewsComponent } from './pages/favorites-news/favorites-news.component';
import { RegisterNewsComponent } from './pages/register-news/register-news.component';
import { SearchComponent } from './pages/search/search.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { EditNewsComponent } from './pages/edit-news/edit-news.component';
import { NewsSingleComponent } from './pages/news-single/news-single.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: "full",
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'NewsLBS'
  },
  {
    path: 'noticias-favoritas',
    component: FavoritesNewsComponent,
    title: 'NewsLBS - Notícias favoritas'
  },
  {
    path: 'cadastrar-noticia',
    component: RegisterNewsComponent,
    title: 'NewsLBS - Cadastrar notícia'
  },
  {
    path: 'editar-noticia/:id',
    component: EditNewsComponent,
    title: 'NewsLBS - Editar notícia'
  },
  {
    path: 'noticia/:id',
    component: NewsSingleComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];
