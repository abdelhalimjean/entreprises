import { Component, input, InputSignal } from '@angular/core';
import { ISocial } from '../../../models/entreprise.model';
import { SocialLinkComponent } from '../social-link/social-link.component';
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapDiscord,
  bootstrapFacebook,
  bootstrapGithub,
  bootstrapGitlab,
  bootstrapInstagram,
  bootstrapLinkedin,
  bootstrapTelegram,
  bootstrapTwitterX,
  bootstrapWhatsapp,
  bootstrapYoutube,
} from '@ng-icons/bootstrap-icons';
import {
  socialMediaIconsColorMap,
  socialMediaIconsMap,
  SocialMediaPlatform,
} from '../../../models/social-media-plateform.enum';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [SocialLinkComponent],
  templateUrl: './socials.component.html',
  providers: [
    provideIcons({
      bootstrapLinkedin,
      bootstrapFacebook,
      bootstrapTwitterX,
      bootstrapWhatsapp,
      bootstrapInstagram,
      bootstrapYoutube,
      bootstrapTelegram,
      bootstrapDiscord,
      bootstrapGithub,
      bootstrapGitlab,
    }),
  ],
})
export class SocialsComponent {
  socials: InputSignal<ISocial[]> = input.required();

  socialMediaIconsMap: Map<SocialMediaPlatform, string> = socialMediaIconsMap;
  socialMediaIconsColorMap: Map<SocialMediaPlatform, string> =
    socialMediaIconsColorMap;
}
