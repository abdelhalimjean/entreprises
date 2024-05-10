import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  template: `
    <div class="flex min-h-[100dvh] flex-col">
      <div class="flex-1">
        <app-header />

        <div class="background-blob"></div>
        <div class="container mx-auto mt-20 px-4">
          <ng-content />
        </div>
      </div>

      <app-footer />
    </div>
  `,
  styleUrl: './container.components.scss',
})
export class ContainerComponent {}
