import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapHeartFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIcon],
  template: `
    <footer
      class="sticky bottom-0 w-full py-4 text-center text-xs font-extralight text-white/60 hover:text-white/80"
    >
      Crée avec
      <ng-icon
        name="bootstrapHeartFill"
        class="align-middle text-byte-400"
      ></ng-icon>
      par
      <a href="https://www.linkedin.com/in/abdelhalimjean/">Abdelhalim Jean</a>
      @if (totalContributors > 1) {
        +
        <a
          href="https://github.com/abdelhalimjean/entreprises/graphs/contributors"
        >
          {{ totalContributors - 1 }} contributeurs
        </a>
      }
    </footer>
  `,
  providers: [provideIcons({ bootstrapHeartFill })],
})
export class FooterComponent {
  readonly totalContributors: number = 3;
}
