import { Component, input, InputSignal } from '@angular/core';
import { IEntreprise } from '../../models/entreprise.model';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { SocialLinkComponent } from './social-link/social-link.component';
import { SocialsComponent } from './socials/socials.component';
import {
  bootstrapArrowRightShort,
  bootstrapGlobe,
  bootstrapPhone,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-entreprise-card',
  standalone: true,
  imports: [NgOptimizedImage, NgIcon, SocialLinkComponent, SocialsComponent],
  templateUrl: './entreprise-card.component.html',
  styleUrl: './entreprise-card.component.scss',
  providers: [
    provideIcons({
      bootstrapArrowRightShort,
      bootstrapGlobe,
      bootstrapPhone,
    }),
  ],
})
export class EntrepriseCardComponent {
  entreprise: InputSignal<IEntreprise> = input.required();
}
