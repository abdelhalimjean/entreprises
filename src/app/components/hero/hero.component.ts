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
  bootstrapBuilding,
  bootstrapSearch,
  bootstrapStack,
  bootstrapArrowCounterclockwise,
} from '@ng-icons/bootstrap-icons';
import { FormsModule } from '@angular/forms';
import { IEntreprise } from '../../models/entreprise.model';
import { EntrepriseCardComponent } from '../entreprise-card/entreprise-card.component';
import { City } from '../../models/cities.enum';
import { EntrepriseService } from '../../services/entreprise.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgIcon, FormsModule, EntrepriseCardComponent,TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  providers: [
    provideIcons({
      bootstrapSearch,
      bootstrapBuilding,
      bootstrapStack,
      bootstrapArrowCounterclockwise,
    }),
  ],
})
export class HeroComponent implements OnInit {
  private route = inject(ActivatedRoute);
  entrepriseService = inject(EntrepriseService);
  technology: WritableSignal<string> = signal('');
  #allEntreprises: Signal<IEntreprise[]> = toSignal(
    this.entrepriseService.getFakeEntrepriseData()
  );
  keyword: WritableSignal<string> = signal('');
  city: WritableSignal<string> = signal('');

  cities: City[] = Object.keys(City).map((city) => city as City);
  isSpinning = false;

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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const technology = params['technology'];
      if (technology) {
        this.technology.set(technology);
      }
    });
  }
  resetFields(): void {
    this.isSpinning = true;
    setTimeout(() => {
      this.isSpinning = false;
    }, 200);
    this.keyword.set('');
    this.technology.set('');
    this.city.set('');
  }
}
