import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapHeartFill } from '@ng-icons/bootstrap-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIcon,TranslateModule],
  template: `
    <footer
      class="sticky bottom-0 w-full py-4 text-center text-xs font-extralight text-white/60 hover:text-white/80"
    >
    {{ 'Crée avec' | translate }}
      <ng-icon
        name="bootstrapHeartFill"
        class="align-middle text-byte-400"
      ></ng-icon>
      {{ 'par' | translate }}
      <a href="https://www.linkedin.com/in/abdelhalimjean/"> {{ 'Abdelhalim Jean' | translate }}</a>
      @if (totalContributors > 1) {
        +
        <a
          href="https://github.com/abdelhalimjean/entreprises/graphs/contributors"
        >
          {{ totalContributors - 1 }}{{ 'contributeurs' | translate }}
        </a>
      }
    </footer>
  `,
  providers: [provideIcons({ bootstrapHeartFill })],
})
export class FooterComponent {
  readonly totalContributors: number = 3;
}
