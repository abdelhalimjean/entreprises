export enum SocialMediaPlatform {
  Linkedin,
  Facebook,
  Instagram,
  WhatsApp,
  Youtube,
  Twitter,
  Github,
  Gitlab,
  Telegram,
  Discord,
}

export const socialMediaIconsMap: Map<SocialMediaPlatform, string> = new Map<
  SocialMediaPlatform,
  string
>([
  [SocialMediaPlatform.Facebook, 'bootstrapFacebook'],
  [SocialMediaPlatform.Youtube, 'bootstrapYoutube'],
  [SocialMediaPlatform.Instagram, 'bootstrapInstagram'],
  [SocialMediaPlatform.Linkedin, 'bootstrapLinkedin'],
  [SocialMediaPlatform.WhatsApp, 'bootstrapWhatsapp'],
  [SocialMediaPlatform.Twitter, 'bootstrapTwitterX'],
  [SocialMediaPlatform.Telegram, 'bootstrapTelegram'],
  [SocialMediaPlatform.Discord, 'bootstrapDiscord'],
  [SocialMediaPlatform.Github, 'bootstrapGithub'],
  [SocialMediaPlatform.Gitlab, 'bootstrapGitlab'],
]);

export const socialMediaIconsColorMap: Map<SocialMediaPlatform, string> =
  new Map<SocialMediaPlatform, string>([
    [SocialMediaPlatform.Facebook, 'text-facebook'],
    [SocialMediaPlatform.Youtube, 'text-youtube'],
    [SocialMediaPlatform.Instagram, 'text-instagram'],
    [SocialMediaPlatform.Linkedin, 'text-linkedin'],
    [SocialMediaPlatform.WhatsApp, 'text-whatsapp'],
    [SocialMediaPlatform.Twitter, 'text-twitter'],
    [SocialMediaPlatform.Telegram, 'text-telegram'],
    [SocialMediaPlatform.Discord, 'text-discord'],
    [SocialMediaPlatform.Github, 'text-github'],
    [SocialMediaPlatform.Gitlab, 'text-gitlab'],
  ]);
