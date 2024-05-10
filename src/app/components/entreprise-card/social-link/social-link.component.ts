import { Component, input, InputSignal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-social-link',
  standalone: true,
  template: `
    <a href="{{ link() }}" target="_blank">
      <ng-icon class="align-middle text-lg" name="{{ icon() }}" />
    </a>
  `,
  imports: [NgIcon],
})
export class SocialLinkComponent {
  link: InputSignal<string> = input.required();
  icon: InputSignal<string> = input.required();
}
