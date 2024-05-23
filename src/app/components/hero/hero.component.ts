import {
  Component,
  computed,
  HostListener,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapBuilding,
  bootstrapSearch,
  bootstrapStack,
} from '@ng-icons/bootstrap-icons';
import { FormsModule } from '@angular/forms';
import { IEntreprise } from '../../models/entreprise.model';
import { EntrepriseCardComponent } from '../entreprise-card/entreprise-card.component';
import { City } from '../../models/cities.enum';
import { EntrepriseService } from '../../services/entreprise.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavbarComponent } from '../layout/navbar/navbar.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgIcon, FormsModule, EntrepriseCardComponent,NavbarComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  providers: [
    provideIcons({ bootstrapSearch, bootstrapBuilding, bootstrapStack }),
  ],
})
export class HeroComponent {
  entrepriseService = inject(EntrepriseService);
  technology: WritableSignal<string> = signal('');
  #allEntreprises: Signal<IEntreprise[]> = toSignal(
    this.entrepriseService.getFakeEntrepriseData()
  );
  keyword: WritableSignal<string> = signal('');
  city: WritableSignal<string> = signal('');

  cities: City[] = Object.keys(City).map((city) => city as City);

  filteredEntreprises: Signal<IEntreprise[]> = computed(() => {
    if (this.#allEntreprises()) {
      return this.#allEntreprises().filter(
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
      return []; // Return an empty array if data is not available ye
    }
  });


  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const button = document.querySelector('.scroll') as HTMLElement;
    if (window.scrollY > 200) {
      button.classList.add('show');
    } else {
      button.classList.remove('show');
    }
  }
}
