/**
 * Preview document typography class names.
 * Font sizes are defined once in src/index.css @theme.
 */
export const resumeText = {
  display: 'text-resume-display',
  body: 'text-resume-body',
  meta: 'text-resume-meta',
  section: 'text-resume-section',
  pill: 'text-resume-pill',
} as const;

export const letterText = {
  body: 'text-letter-body',
} as const;

export const resumeSectionHeaderClass =
  `${resumeText.section} font-bold uppercase tracking-wider pb-1 mb-2`;

export const resumePillClass = `${resumeText.pill} px-2 py-0.5 rounded border font-medium`;
