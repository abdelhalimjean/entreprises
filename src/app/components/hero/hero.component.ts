import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapSearch,
  bootstrapBuilding,
  bootstrapStack,
} from '@ng-icons/bootstrap-icons';
import { FormsModule } from '@angular/forms';
import { IEntreprise } from '../../models/entreprise.model';
import { EntrepriseCardComponent } from '../entreprise-card/entreprise-card.component';
import { SocialMediaPlatform } from '../../models/social-media-plateform.enum';
import { City } from '../../models/cities.enum';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgIcon, FormsModule, EntrepriseCardComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  providers: [
    provideIcons({ bootstrapSearch, bootstrapBuilding, bootstrapStack }),
  ],
})
export class HeroComponent {
  technology: WritableSignal<string> = signal('');
  #allEntreprises: IEntreprise[] = this.getFakeEntrepriseData();
  keyword: WritableSignal<string> = signal('');
  city: WritableSignal<string> = signal('');

  cities: City[] = Object.keys(City).map((city) => city as City);

  filteredEntreprises: Signal<IEntreprise[]> = computed(() =>
    this.#allEntreprises.filter(
      (entreprise: IEntreprise) =>
        (this.keyword() == '' ||
          entreprise.name
            .toLowerCase()
            .includes(this.keyword().toLowerCase())) &&
        (this.city() == '' || entreprise.city == this.city()) &&
        ((entreprise.technologiesUsed || []).some((tech) =>
          tech.toLowerCase().includes(this.technology().toLowerCase())
        ) ||
          this.technology() == '')
    )
  );

  getFakeEntrepriseData(): IEntreprise[] {
    return [
      {
        name: 'FakeCorp',
        city: City.Nouadhibou,
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
      },
      {
        name: 'FakeComp',
        city: City.Nouakchott,
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
        shortDescription: "FakeComp : Connecter le monde, façonner l'avenir",
        longDescription:
          "A la pointe de l'innovation et d'excellence depuis 1975, Fake Corp. s'impose comme un acteur technologique majeur façonnant l'avenir. IA, logiciels, cloud computing et télécommunications : l'entreprise propose un panel de solutions de pointe pour accompagner les entreprises et les particuliers dans leur transition vers un avenir durable.",
        sectors: ['Technology', 'AI', 'Software', 'Consulting'],
        technologiesUsed: ['Azure', 'Flutter', 'HTML'],
        logo: 'https://img.logoipsum.com/331.svg',
      },
    ];
  }
}
