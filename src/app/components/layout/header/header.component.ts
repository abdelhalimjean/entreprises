import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { fromEvent } from 'rxjs';
import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  bootstrapGithub,
  bootstrapDiscord,
  bootstrapWhatsapp,
  bootstrapBuildingAdd,
} from '@ng-icons/bootstrap-icons';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIcon, RouterLink, NgClass],
  templateUrl: './header.component.html',
  providers: [
    provideIcons({
      bootstrapGithub,
      bootstrapDiscord,
      bootstrapWhatsapp,
      bootstrapBuildingAdd,
    }),
  ],
})
export class HeaderComponent implements OnInit {
  #platformId: Object = inject(PLATFORM_ID);
  showBlurredNavbar = false;
  dialogService = inject(DialogService);

  openDialog(): void {
    console.log('-----clicked-------');
    this.dialogService.showDialog();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.#platformId)) {
      // monitor the scroll position and update the navbar accordingly
      fromEvent(window, 'scroll').subscribe(() => {
        this.showBlurredNavbar = window.scrollY > 0;
      });
    }
  }
}
