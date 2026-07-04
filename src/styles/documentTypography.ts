/**
 * Preview document typography class names.
 * Font sizes are defined in src/index.css @theme.
 */
export const resumeText = {
  display: 'text-resume-display',
  body: 'text-resume-body',
  meta: 'text-resume-meta',
  section: 'text-resume-section',
  pill: 'text-resume-pill',
} as const;

/** Modern Split — each role 2px smaller than classic (see index.css). */
export const modernSplitText = {
  display: 'text-resume-modern-display',
  body: 'text-resume-modern-body',
  meta: 'text-resume-modern-meta',
  section: 'text-resume-modern-section',
  pill: 'text-resume-modern-pill',
} as const;

export interface ResumeTypography {
  readonly display: string;
  readonly body: string;
  readonly meta: string;
  readonly section: string;
  readonly pill: string;
}

export const letterText = {
  body: 'text-letter-body',
} as const;

export function sectionHeaderClass(typography: ResumeTypography): string {
  return `${typography.section} font-bold uppercase tracking-wider pb-1 mb-2`;
}

export function pillClass(typography: ResumeTypography): string {
  return `${typography.pill} px-2 py-0.5 rounded border font-medium`;
}
