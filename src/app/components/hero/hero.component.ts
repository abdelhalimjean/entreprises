import {
  Component,
  computed,
  inject,
  OnInit,
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
import { EntrepriseService } from '../../services/entreprise.service';

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
export class HeroComponent implements OnInit {
  technology: WritableSignal<string> = signal('');
  #allEntreprises: IEntreprise[];
  keyword: WritableSignal<string> = signal('');
  city: WritableSignal<string> = signal('');
  entrepriseService = inject(EntrepriseService);
  dataFetched: boolean = false;

  cities: City[] = Object.keys(City).map((city) => city as City);

  ngOnInit(): void {
    this.entrepriseService
      .getFakeEntrepriseData()
      .subscribe((data: IEntreprise[]) => {
        this.#allEntreprises = data;
        this.dataFetched = true;
      });
  }

  filteredEntreprises: Signal<IEntreprise[]> = computed(() => {
    if (this.dataFetched) {
      return this.#allEntreprises.filter(
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
      );
    } else {
      return []; // Return an empty array if data is not available yet
    }
  });
}
