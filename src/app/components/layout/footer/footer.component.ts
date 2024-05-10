import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapHeartFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIcon],
  template: `
    <footer class="sticky bottom-0 w-full py-4 text-center text-sm ">
      <a
        href="https://www.linkedin.com/in/abdelhalimjean/"
        class="text-white/80 hover:text-white"
      >
        Made with
        <ng-icon
          name="bootstrapHeartFill"
          class="text-byte-400 align-middle"
        ></ng-icon>
        by Abdelhalim Jean
      </a>
    </footer>
  `,
  providers: [provideIcons({ bootstrapHeartFill })],
})
export class FooterComponent {}
