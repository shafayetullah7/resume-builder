import { describe, it, expect } from 'vitest';
import { formatCoverLetterText, getCoverLetterSalutation } from './coverLetterFormat';
import type { CoverLetter, PersonalInfo } from '../types/resume';

const personalInfo: PersonalInfo = {
  fullName: 'Jane Doe',
  jobTitle: 'Engineer',
  email: 'jane@example.com',
  phone: '+1 555 1234',
  address: 'San Francisco, CA',
  summary: '',
};

const coverLetter: CoverLetter = {
  recipientName: 'Alex Smith',
  recipientTitle: 'Hiring Manager',
  companyName: 'Acme Corp',
  companyAddress: '123 Main St',
  content: 'I am excited to apply.\n\nThank you for your consideration.',
};

describe('coverLetterFormat', () => {
  it('formats the full letter with section breaks', () => {
    const text = formatCoverLetterText(personalInfo, coverLetter, {
      date: new Date('2026-06-15T12:00:00'),
    });

    expect(text).toContain('Jane Doe');
    expect(text).toContain('jane@example.com');
    expect(text).toContain('June 15, 2026');
    expect(text).toContain('Alex Smith');
    expect(text).toContain('Acme Corp');
    expect(text).toContain(getCoverLetterSalutation(coverLetter));
    expect(text).toContain('I am excited to apply.');
    expect(text).toContain('Sincerely,');
    expect(text.endsWith('Jane Doe')).toBe(true);
  });

  it('uses default salutation when recipient name is missing', () => {
    expect(getCoverLetterSalutation({ ...coverLetter, recipientName: '' })).toBe('Dear Hiring Manager,');
  });
});
