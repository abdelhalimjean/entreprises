import { Component, inject, input, InputSignal } from '@angular/core';
import { IEntreprise } from '../../models/entreprise.model';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { SocialLinkComponent } from './social-link/social-link.component';
import { SocialsComponent } from './socials/socials.component';
import {
  bootstrapArrowRightShort,
  bootstrapCursor,
  bootstrapGlobe,
  bootstrapPhone,
  bootstrapFolderSymlink,
} from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-entreprise-card',
  standalone: true,
  imports: [NgOptimizedImage, NgIcon, SocialLinkComponent, SocialsComponent,TranslateModule],
  templateUrl: './entreprise-card.component.html',
  providers: [
    provideIcons({
      bootstrapArrowRightShort,
      bootstrapCursor,
      bootstrapGlobe,
      bootstrapPhone,
      bootstrapFolderSymlink,
    }),
  ],
})
export class EntrepriseCardComponent {
  private router = inject(Router);
  entreprise: InputSignal<IEntreprise> = input.required();

  openTechnologyTab(technology: string): void {
    const url = this.router
      .createUrlTree([], { queryParams: { technology } })
      .toString();
    window.open(url, '_blank');
  }
}
