import type { CoverLetter, PersonalInfo } from '../types/resume';

export function getCoverLetterDate(date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getCoverLetterSalutation(coverLetter: CoverLetter): string {
  return coverLetter.recipientName ? `Dear ${coverLetter.recipientName},` : 'Dear Hiring Manager,';
}

export function formatCoverLetterText(
  personalInfo: PersonalInfo,
  coverLetter: CoverLetter,
  options?: { date?: Date },
): string {
  const lines: string[] = [];

  lines.push(personalInfo.fullName || 'Your Name');
  if (personalInfo.address) lines.push(personalInfo.address);
  if (personalInfo.email) lines.push(personalInfo.email);
  if (personalInfo.phone) lines.push(personalInfo.phone);

  lines.push('');
  lines.push(getCoverLetterDate(options?.date));

  const hasRecipient =
    coverLetter.recipientName ||
    coverLetter.recipientTitle ||
    coverLetter.companyName ||
    coverLetter.companyAddress;

  if (hasRecipient) {
    lines.push('');
    if (coverLetter.recipientName) lines.push(coverLetter.recipientName);
    if (coverLetter.recipientTitle) lines.push(coverLetter.recipientTitle);
    if (coverLetter.companyName) lines.push(coverLetter.companyName);
    if (coverLetter.companyAddress) lines.push(coverLetter.companyAddress);
  }

  lines.push('');
  lines.push(getCoverLetterSalutation(coverLetter));
  lines.push('');
  lines.push(coverLetter.content || 'Your cover letter content will appear here...');
  lines.push('');
  lines.push('Sincerely,');
  lines.push(personalInfo.fullName || 'Your Name');

  return lines.join('\n');
}
