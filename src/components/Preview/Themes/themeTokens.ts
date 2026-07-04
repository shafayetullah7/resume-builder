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
  },
  'modern-split': {
    id: 'modern-split',
    accent: '#547690',
    sidebarBg: 'bg-[#eef1f4]',
    skillsStyle: 'pills',
    showIcons: true,
    typography: modernSplitText,
    sectionGap: 'mb-2',
    entryGap: 'mb-1.5',
    padding: 'p-5',
  },
};

export function sectionHeaderStyle(tokens: ThemeTokens): CSSProperties {
  return { color: tokens.accent, borderBottom: `1px solid ${tokens.accent}30` };
}
