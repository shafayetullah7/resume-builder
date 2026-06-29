import { describe, it, expect } from 'vitest';
import { exportResumeToJson } from './jsonExporter';
import { parseJsonResume } from './jsonImporter';
import type { ResumeData } from '../types/resume';
import { CURRENT_SCHEMA_VERSION, defaultSectionVisibility } from '../types/resume';

const sampleData: ResumeData = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  theme: 'classic',
  personalInfo: {
    fullName: 'Test User',
    jobTitle: 'Engineer',
    email: 'test@example.com',
    phone: '555',
    address: 'NYC',
    summary: 'Summary text',
  },
  experience: [
    {
      id: '1',
      company: 'Acme',
      position: 'Dev',
      location: 'Remote',
      startDate: '2021-01',
      endDate: '2022-01',
      current: false,
      format: 'bullets',
      bullets: ['Built things'],
      description: '',
    },
  ],
  education: [],
  skills: [{ id: '1', category: 'Lang', skills: ['TS'] }],
  projects: [],
  languages: [],
  interests: [],
  certifications: [],
  interestsFormat: 'bullets',
  interestsParagraph: '',
  sectionLabels: {
    contact: 'Contact',
    profile: 'Profile',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    languages: 'Languages',
    interests: 'Interests',
    certifications: 'Certifications',
  },
  sectionVisibility: { ...defaultSectionVisibility(), interests: false },
  coverLetter: {
    recipientName: 'HM',
    recipientTitle: 'Manager',
    companyName: 'Co',
    companyAddress: 'Addr',
    content: 'Letter',
  },
};

describe('jsonRoundTrip', () => {
  it('exports and parses all fields', () => {
    const exported = exportResumeToJson(sampleData);
    const json = JSON.stringify(exported);
    const parsed = parseJsonResume(json);

    expect(parsed.theme).toBe('classic');
    expect(parsed.sectionVisibility?.interests).toBe(false);
    expect(parsed.experience?.[0].location).toBe('Remote');
    expect(parsed.experience?.[0].bullets).toEqual(['Built things']);
    expect(parsed.coverLetter?.content).toBe('Letter');
    expect(parsed.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
  });
});
