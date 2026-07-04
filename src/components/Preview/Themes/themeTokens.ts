import type { CSSProperties } from 'react';
import type { ThemeId } from '../../../types/resume';
import { modernSplitText, resumeText, type ResumeTypography } from '../../../styles/documentTypography';

export interface ThemeTokens {
  id: ThemeId;
  accent: string;
  sidebarBg?: string;
  skillsStyle: 'comma' | 'pills';
  showIcons: boolean;
  typography: ResumeTypography;
  sectionGap: string;
  entryGap: string;
  padding: string;
  sectionHeaderSpacing: string;
  blockGap: string;
  itemGap: string;
  summaryLeading: string;
  contactStackGap: string;
}

export const themeTokens: Record<ThemeId, ThemeTokens> = {
  classic: {
    id: 'classic',
    accent: '#2D4A6B',
    skillsStyle: 'comma',
    showIcons: true,
    typography: resumeText,
    sectionGap: 'mb-3',
    entryGap: 'mb-2',
    padding: 'p-5',
    sectionHeaderSpacing: 'pb-1 mb-2',
    blockGap: 'gap-3',
    itemGap: 'gap-2',
    summaryLeading: 'leading-relaxed',
    contactStackGap: 'gap-2',
  },
  'modern-split': {
    id: 'modern-split',
    accent: '#547690',
    sidebarBg: 'bg-[#eef1f4]',
    skillsStyle: 'pills',
    showIcons: true,
    typography: modernSplitText,
    sectionGap: 'mb-1.5',
    entryGap: 'mb-1',
    padding: 'p-4',
    sectionHeaderSpacing: 'pb-0.5 mb-1.5',
    blockGap: 'gap-2',
    itemGap: 'gap-1.5',
    summaryLeading: 'leading-snug',
    contactStackGap: 'gap-1.5',
  },
};

export function sectionHeaderStyle(tokens: ThemeTokens): CSSProperties {
  return { color: tokens.accent, borderBottom: `1px solid ${tokens.accent}30` };
}
