import { SocialMediaPlatform } from './social-media-plateform.enum';

export interface IEntreprise {
  name: string;
  adresse: IAdresse;
  shortDescription: string;
  longDescription?: string;
  sectors: string[];
  technologiesUsed?: string[];
  logo?: string;
}

export interface IAdresse {
  location: string;
  locationGPSCoordinates?: string;
  phoneNumber1: string;
  phoneNumber2?: string;
  website?: string;
  email?: string;
  socials?: ISocial[];
}
export interface ISocial {
  platform: SocialMediaPlatform;
  value: string;
}
