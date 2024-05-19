import { SocialMediaPlatform } from './social-media-plateform.enum';
import { City } from './cities.enum';

export interface IEntreprise {
  name: string;
  adresse: IAdresse;
  shortDescription: string;
  longDescription?: string;
  sectors: string[];
  technologiesUsed?: string[];
  logo?: string;
  city?: string;
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

export interface ICity {
  name: City;
  value: string;
}
