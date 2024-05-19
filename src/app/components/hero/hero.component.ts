import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapSearch } from '@ng-icons/bootstrap-icons';
import { FormsModule } from '@angular/forms';
import { IEntreprise } from '../../models/entreprise.model';
import { EntrepriseCardComponent } from '../entreprise-card/entreprise-card.component';
import { SocialMediaPlatform } from '../../models/social-media-plateform.enum';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgIcon, FormsModule, EntrepriseCardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  providers: [provideIcons({ bootstrapSearch })],
})
export class HeroComponent {
  #allEntreprises: IEntreprise[] = [this.getFakeEntrepriseData()];
  keyword: WritableSignal<string> = signal('');

  filteredEntreprises: Signal<IEntreprise[]> = computed(() =>
    this.keyword()
      ? this.#allEntreprises.filter(
        (entreprise: IEntreprise) =>
          entreprise.name
            .toLowerCase()
            .includes(this.keyword().toLowerCase()) ||
          entreprise.shortDescription
            .toLowerCase()
            .includes(this.keyword().toLowerCase()) ||
          entreprise.city
            .toLowerCase()
            .includes(this.keyword().toLowerCase())
          
      )
      : this.#allEntreprises
  );
 
  
  getFakeEntrepriseData(): IEntreprise {
    return {
      name: 'FakeCorp',
      adresse: {
        location: 'Your Company Address',
        phoneNumber1: '+22223456789',
        website: 'https://www.fakecorp.com',
        socials: [
          {
            platform: SocialMediaPlatform.Linkedin,
            value: 'https://www.linkedin.com/company/fakecorp',
          },
          {
            platform: SocialMediaPlatform.Facebook,
            value: 'https://www.facebook.com/fakecorp',
          },
          {
            platform: SocialMediaPlatform.Instagram,
            value: 'https://www.instagram.com/fakecorptheofficial',
          },
          {
            platform: SocialMediaPlatform.WhatsApp,
            value: 'https://chat.whatsapp.com/22223456789',
          },
          {
            platform: SocialMediaPlatform.Youtube,
            value: 'https://www.youtube.com/fakecorp',
          },
          {
            platform: SocialMediaPlatform.Twitter,
            value: 'https://twitter.com/FakeCorp',
          },
          {
            platform: SocialMediaPlatform.Github,
            value: 'https://github.com/FakeCorp',
          },
          {
            platform: SocialMediaPlatform.Gitlab,
            value: 'https://gitlab.com/fakecorp',
          },
          {
            platform: SocialMediaPlatform.Telegram,
            value: 'https://t.me/fakecorp',
          },
          {
            platform: SocialMediaPlatform.Discord,
            value: 'https://discord.gg/fakecorp',
          },
        ],
      },
      shortDescription: "FakeCorp : Connecter le monde, façonner l'avenir",
      longDescription:
        "A la pointe de l'innovation et d'excellence depuis 1975, Fake Corp. s'impose comme un acteur technologique majeur façonnant l'avenir. IA, logiciels, cloud computing et télécommunications : l'entreprise propose un panel de solutions de pointe pour accompagner les entreprises et les particuliers dans leur transition vers un avenir durable.",
      sectors: ['Technology', 'AI', 'Software', 'Consulting'],
      technologiesUsed: [
        'Python',
        'Angular',
        'HTML',
        'CSS',
        'Tailwind',
        'React',
        'NextJS',
        'JavaScript',
        'AWS',
      ],
      logo: 'https://img.logoipsum.com/331.svg',
      city: 'Nouakchott',
    };
  }
}
