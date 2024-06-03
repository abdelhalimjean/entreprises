import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { fromEvent } from 'rxjs';
import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  bootstrapGithub,
  bootstrapDiscord,
  bootstrapWhatsapp,
} from '@ng-icons/bootstrap-icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIcon, RouterLink, NgClass,TranslateModule],
  templateUrl: './header.component.html',
  providers: [
    provideIcons({ bootstrapGithub, bootstrapDiscord, bootstrapWhatsapp }),
  ],
})
export class HeaderComponent implements OnInit {
  #platformId: Object = inject(PLATFORM_ID);
  showBlurredNavbar = false;
  lang :any ='';

  constructor(public translateService : TranslateService){}

  ngOnInit(): void {
    if (isPlatformBrowser(this.#platformId)) {
      // monitor the scroll position and update the navbar accordingly
      fromEvent(window, 'scroll').subscribe(() => {
        this.showBlurredNavbar = window.scrollY > 0;
      });
      this.lang = localStorage.getItem("preferredLanguage");
    }

  }

  
  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.translateService.use(selectElement.value);
    localStorage.setItem('preferredLanguage', selectElement.value);
  }
}
