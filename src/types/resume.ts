export type ThemeId = 'classic' | 'modern-split';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  whatsapp?: string;
  dateOfBirth?: string;
  nationality?: string;
  gender?: string;
  summary: string;
}

export interface ExperienceProject {
  id: string;
  name: string;
  projectDescription: string;
  format: 'paragraph' | 'bullets';
  description: string;
  bullets: string[];
  liveLink?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  format: 'paragraph' | 'bullets';
  bullets: string[];
  current: boolean;
  experienceProjects?: ExperienceProject[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: string[];
}

export interface ProjectLink {
  label: string;
  liveUrl: string;
  githubUrl: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  highlights: string[];
  startDate?: string;
  endDate?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Interest {
  id: string;
  name: string;
}

export interface SectionLabels {
  contact: string;
  profile: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  languages: string;
  interests: string;
  certifications: string;
}

export interface SectionVisibility {
  summary: boolean;
  experience: boolean;
  projects: boolean;
  skills: boolean;
  education: boolean;
  certifications: boolean;
  languages: boolean;
  interests: boolean;
}

export interface CoverLetter {
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  content: string;
}

export interface SectionProgress {
  name: string;
  filled: number;
  total: number;
  percentage: number;
}

export interface ResumeProgress {
  overall: number;
  sections: SectionProgress[];
}

export const CURRENT_SCHEMA_VERSION = 2;

export const defaultSectionVisibility = (): SectionVisibility => ({
  summary: true,
  experience: true,
  projects: true,
  skills: true,
  education: true,
  certifications: true,
  languages: true,
  interests: true,
});

export interface ResumeData {
  schemaVersion: number;
  theme: ThemeId;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  languages: Language[];
  interests: Interest[];
  certifications: Certification[];
  interestsFormat: 'bullets' | 'paragraph';
  interestsParagraph: string;
  sectionLabels: SectionLabels;
  sectionVisibility: SectionVisibility;
  coverLetter: CoverLetter;
}
