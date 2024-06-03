import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/layout/container/container.component';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContainerComponent, MarkdownComponent,TranslateModule],
  template: `
    <app-container>
      <router-outlet></router-outlet>
    </app-container>
  `,
})
export class AppComponent {
  translateService = inject(TranslateService);
  private platformId: Object = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
       // Check if language preference is stored in local storage
    const storedLang = localStorage.getItem('preferredLanguage');

    if (storedLang) {
      // Use the stored language
      this.translateService.use(storedLang);
    } else {
      // Set default language and store it in local storage
      this.translateService.setDefaultLang('fr'); // Set default language
      localStorage.setItem('preferredLanguage', 'fr'); // Store the default language
    }
    }
   
  }
}
