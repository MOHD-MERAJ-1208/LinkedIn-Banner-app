
export interface BannerInputs {
  name: string;
  jobTitle: string;
  services: string;
  customPrompt: string;
  userPhoto: string | null;
  referenceBanner: string | null;
}

export interface GeneratedBanner {
  url: string;
  timestamp: number;
}
