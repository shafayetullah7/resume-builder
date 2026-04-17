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
  format: 'paragraph' | 'bullets';
  description: string;
  bullets: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
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
  skills: string[]; // List of skills in this category
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  highlights: string[];
  startDate?: string;
  endDate?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string; // e.g., Native, Fluent, Beginner
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

export interface ResumeData {
  theme: string;
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
}
