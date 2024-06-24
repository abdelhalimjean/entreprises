import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EntrepriseService } from '../../services/entreprise.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogService } from '../../services/dialog.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-entreprise-form',
  standalone: true,
  imports: [
    DialogModule,
    InputTextModule,
    DropdownModule,
    ChipsModule,
    ButtonModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
  ],
  templateUrl: './entreprise-form.component.html',
  providers: [MessageService],
})
export class EntrepriseFormComponent implements OnInit, OnDestroy {
  companyForm: FormGroup;
  displayDialog: boolean = false;
  isBrowser: boolean = false;
  data: any;
  entrepriseId: any | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private entrepriseService: EntrepriseService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private router: Router,
    private imageService: ImageService
  ) {
    this.dialogService.dialogVisibility$.subscribe((visible) => {
      this.displayDialog = visible;
    });
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.companyForm = this.fb.group({
        name: ['', Validators.required],
        city: ['', Validators.required],
        adresse: this.fb.group({
          location: ['', Validators.required],
          phoneNumber1: ['', Validators.required],
          website: ['', Validators.required],
          youtube: [''],
          linkedin: [''],
          github: [''],
          facebook: [''],
        }),
        shortDescription: ['', Validators.required],
        longDescription: ['', Validators.required],
        sectors: [[], Validators.required],
        technologiesUsed: [[], Validators.required],
        logo: ['', Validators.required],
      });

      this.route.paramMap.subscribe((params) => {
        const idParam = params.get('id');
        this.entrepriseId = idParam ? +idParam : null;
        if (this.entrepriseId) {
          this.loadEntrepriseData(this.entrepriseId);
        } else {
          this.dialogService.showDialog();
        }
      });
    }
  }

  loadEntrepriseData(id: string) {
    this.entrepriseService.getEntrepriseById(id).subscribe(
      (data) => {
        this.companyForm.patchValue({
          name: data.name,
          city: data.city,
          adresse: {
            location: data.adresse.location,
            phoneNumber1: data.adresse.phoneNumber1,
            website: data.adresse.website,
            youtube:
              data.adresse.socials.find((s: any) => s.platform === 'Youtube')
                ?.value || '',
            linkedin:
              data.adresse.socials.find((s: any) => s.platform === 'Linkedin')
                ?.value || '',
            github:
              data.adresse.socials.find((s: any) => s.platform === 'Github')
                ?.value || '',
            facebook:
              data.adresse.socials.find((s: any) => s.platform === 'Facebook')
                ?.value || '',
          },
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
          sectors: data.sectors,
          technologiesUsed: data.technologiesUsed,
          logo: data.logo,
        });
      },
      (error) => {
        console.error('Error loading entreprise data', error);
      }
    );
  }

  onSubmit() {
    if (this.companyForm.valid) {
      const formData = this.companyForm.value;
      const fileInput: HTMLInputElement = document.querySelector('#logo');
      const file = fileInput.files[0];

      if (file) {
        this.imageService.uploadFile(file).subscribe(
          (url) => {
            formData.logo = url;

            // Construct socials array
            const socials = [
              { platform: 'Linkedin', value: formData.adresse.linkedin },
              { platform: 'Facebook', value: formData.adresse.facebook },
              { platform: 'WhatsApp', value: formData.adresse.whatsapp },
              { platform: 'Youtube', value: formData.adresse.youtube },
              { platform: 'Github', value: formData.adresse.github },
            ];

            // Construct result object
            let result;
            if (this.entrepriseId != null) {
              result = {
                id: this.entrepriseId,
                name: formData.name,
                city: formData.city,
                adresse: {
                  location: formData.adresse.location,
                  phoneNumber1: formData.adresse.phoneNumber1,
                  website: formData.adresse.website,
                  socials: socials.filter((social) => social.value), // Remove empty values
                },
                shortDescription: formData.shortDescription,
                longDescription: formData.longDescription,
                sectors: formData.sectors,
                technologiesUsed: formData.technologiesUsed,
                logo: formData.logo,
              };
            } else {
              result = {
                name: formData.name,
                city: formData.city,
                adresse: {
                  location: formData.adresse.location,
                  phoneNumber1: formData.adresse.phoneNumber1,
                  website: formData.adresse.website,
                  socials: socials.filter((social) => social.value), // Remove empty values
                },
                shortDescription: formData.shortDescription,
                longDescription: formData.longDescription,
                sectors: formData.sectors,
                technologiesUsed: formData.technologiesUsed,
                logo: formData.logo,
              };
            }

            // Construct discordPayload object
            const discordPayload = {
              content: '```json\n' + JSON.stringify(result, null, 2) + '\n```', // Send the result as formatted JSON string
            };

            this.data = JSON.stringify(discordPayload);
            this.entrepriseService.postDataToDiscord(this.data).subscribe(
              (response) => {
                console.log('Data posted to Discord successfully:', response);
                // Display success message
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Data posted to Discord successfully',
                });
              },
              (error) => {
                console.log(this.data);
                console.error('Error posting data to Discord:', error);
                // Display error message
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to post data to Discord',
                });
              }
            );
            this.displayDialog = false;
          },
          (error: any) => {
            console.error('Error uploading file:', error);
            // Display error message
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to upload file',
            });
          }
        );
      }
    } else {
      console.error('Form is invalid');
      // Display validation errors
      Object.keys(this.companyForm.controls).forEach((key) => {
        this.companyForm.controls[key].markAsDirty();
        this.companyForm.controls[key].updateValueAndValidity();
      });
    }
  }

  showDialog() {
    this.dialogService.showDialog();
  }

  ngOnDestroy() {
    console.log('destroyed');
    this.dialogService.hideDialog();
  }

  redirectToLastPath() {
    console.log('dialog closed');
    this.dialogService.hideDialog();
    if (this.entrepriseId) {
      this.router.navigate(['/entreprises', this.entrepriseId]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
