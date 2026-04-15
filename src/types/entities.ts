export type ContactSubmission = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdByUserId: string | null;
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactSubmissionDraft = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export type PartnerLogo = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdByUserId: string | null;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  displayOrder: number;
};

export type PartnerLogoDraft = {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  displayOrder: number;
};

export type Testimonial = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdByUserId: string | null;
  authorName: string;
  authorRole: string;
  content: string;
  isActive: boolean;
};

export type TestimonialDraft = {
  authorName: string;
  authorRole: string;
  content: string;
  isActive: boolean;
};
