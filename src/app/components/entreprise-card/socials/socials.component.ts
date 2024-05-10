import {
  Component,
  computed,
  Input,
  input,
  InputSignal,
  InputSignalWithTransform,
  Signal,
} from '@angular/core';
import { ISocial } from '../../../models/entreprise.model';
import { SocialLinkComponent } from '../social-link/social-link.component';
import { provideIcons } from '@ng-icons/core';
import {
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

  sortedSocials: Signal<ISocial[]> = computed(() =>
    this.socials().toSorted(
      (s1: ISocial, s2: ISocial) => s1.platform - s2.platform
    )
  );
  socialMediaIconsMap: Map<SocialMediaPlatform, string> = socialMediaIconsMap;
  socialMediaIconsColorMap: Map<SocialMediaPlatform, string> =
    socialMediaIconsColorMap;
}
