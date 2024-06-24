import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/layout/container/container.component';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { EntrepriseFormComponent } from './components/entreprise-form/entreprise-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ContainerComponent,
    MarkdownComponent,
    EntrepriseFormComponent,
  ],
  template: `
    <app-container>
      <router-outlet></router-outlet>
    </app-container>
  `,
})
export class AppComponent {}
