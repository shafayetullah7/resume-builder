import { describe, it, expect } from 'vitest';
import { migrateResumeData } from './schemaMigration';
import { CURRENT_SCHEMA_VERSION, defaultSectionVisibility } from '../types/resume';

describe('schemaMigration', () => {
  it('migrates v1 data without schemaVersion', () => {
    const v1 = {
      theme: 'modern-split' as const,
      personalInfo: { fullName: 'Test', jobTitle: 'Dev', email: 't@t.com', phone: '', address: '', summary: '' },
      experience: [
        {
          id: '1',
          company: 'Co',
          position: 'Dev',
          startDate: '2020-01',
          endDate: '',
          description: 'Did stuff',
          current: true,
        },
      ],
      education: [],
      skills: [],
      projects: [],
      languages: [],
      interests: [],
      certifications: [],
      interestsFormat: 'bullets' as const,
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
      coverLetter: {
        recipientName: '',
        recipientTitle: '',
        companyName: '',
        companyAddress: '',
        content: '',
      },
    };

    const migrated = migrateResumeData(v1 as unknown as Partial<import('../types/resume').ResumeData>);

    expect(migrated.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
    expect(migrated.experience[0].format).toBe('paragraph');
    expect(migrated.experience[0].bullets).toEqual([]);
    expect(migrated.experience[0].location).toBe('');
    expect(migrated.sectionVisibility).toEqual(defaultSectionVisibility());
  });

  it('falls back invalid theme to classic', () => {
    const migrated = migrateResumeData({ theme: 'invalid' as never });
    expect(migrated.theme).toBe('classic');
  });

  it('renames legacy interests section labels to Learning & Interests', () => {
    for (const legacy of ['Future Focus', 'Currently Exploring'] as const) {
      const migrated = migrateResumeData({
        sectionLabels: {
          contact: 'Contact',
          profile: 'Profile',
          experience: 'Experience',
          education: 'Education',
          skills: 'Skills',
          projects: 'Projects',
          languages: 'Languages',
          interests: legacy,
          certifications: 'Certifications',
        },
      });
      expect(migrated.sectionLabels?.interests).toBe('Learning & Interests');
    }
  });
});
