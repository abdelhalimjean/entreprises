import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { MarkdownComponent } from './components/markdown/markdown.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
  },
  {
    path: 'entreprises/:id',
    component: MarkdownComponent,
  },
];
