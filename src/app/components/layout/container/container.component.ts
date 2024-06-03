import { Component, HostListener } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet, TranslateModule],
  template: `
    <div class="flex min-h-[100dvh] flex-col" [dir]="'dir' | translate">
      <div class="flex-1">
        <app-header />

        <div class="background-blob"></div>
        <div class="container mx-auto mt-20 px-4">
          <ng-content />
        </div>
      </div>
      <button (click)="scrollToTop()" class="scroll-to-top fixed bottom-4 right-4" >
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20240227155250/up.png"
          class="w-16 h-16 rounded-full bg-white" alt="">
      </button>

      <app-footer />
    </div>
  `,
  styleUrl: './container.components.scss',
})
export class ContainerComponent {
  showBackToTopButton = false;
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTopButton = window.scrollY > 300;
  }
}
