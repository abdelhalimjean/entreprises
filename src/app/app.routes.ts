import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { EntrepriseFormComponent } from './components/entreprise-form/entreprise-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
  },
  {
    path: 'entreprises/:id',
    component: MarkdownComponent,
  },
  {
    path: 'entreprise-form',
    component: EntrepriseFormComponent,
  },
  {
    path: 'entreprise-form/:id',
    component: EntrepriseFormComponent,
  },
];
