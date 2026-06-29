import type { ResumeData } from '../types/resume';

export interface ValidationIssue {
  type: 'block' | 'warn';
  message: string;
}

const DEFAULT_PLACEHOLDER_NAMES = ['', 'Your Name', 'Jane Doe', 'John Doe'];

export function validateResumeForExport(resumeData: ResumeData): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const { personalInfo, experience, skills } = resumeData;

  if (!personalInfo.fullName?.trim() || DEFAULT_PLACEHOLDER_NAMES.includes(personalInfo.fullName.trim())) {
    issues.push({ type: 'block', message: 'Full name is required before exporting.' });
  }

  if (!personalInfo.email?.trim()) {
    issues.push({ type: 'warn', message: 'No email address — recruiters may not be able to contact you.' });
  }

  if (experience.length === 0) {
    issues.push({ type: 'warn', message: 'No work experience listed.' });
  }

  if (skills.length === 0 || !skills.some((s) => s.skills.length > 0)) {
    issues.push({ type: 'warn', message: 'No skills listed — ATS keyword matching may be weaker.' });
  }

  if (personalInfo.summary && personalInfo.summary.length > 800) {
    issues.push({ type: 'warn', message: 'Summary is over 800 characters — consider shortening for scannability.' });
  }

  if (personalInfo.dateOfBirth || personalInfo.nationality || personalInfo.gender) {
    issues.push({
      type: 'warn',
      message: 'PII fields (DOB, nationality, gender) are filled — not recommended for US/UK applications.',
    });
  }

  return issues;
}

export function hasBlockingIssues(issues: ValidationIssue[]): boolean {
  return issues.some((i) => i.type === 'block');
}
