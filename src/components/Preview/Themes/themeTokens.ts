import type { CSSProperties } from 'react';
import type { ThemeId } from '../../../types/resume';

export interface ThemeTokens {
  id: ThemeId;
  accent: string;
  sidebarBg?: string;
  skillsStyle: 'comma' | 'pills';
  showIcons: boolean;
  nameSize: string;
  titleSize: string;
  bodySize: string;
  metaSize: string;
  sectionHeaderSize: string;
  pillSize: string;
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
    nameSize: 'text-[18pt]',
    titleSize: 'text-[11pt]',
    bodySize: 'text-[11pt]',
    metaSize: 'text-[10pt]',
    sectionHeaderSize: 'text-[10pt]',
    pillSize: 'text-[9pt]',
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
    nameSize: 'text-[18pt]',
    titleSize: 'text-[11pt]',
    bodySize: 'text-[11pt]',
    metaSize: 'text-[10pt]',
    sectionHeaderSize: 'text-[10pt]',
    pillSize: 'text-[9pt]',
    sectionGap: 'mb-3',
    entryGap: 'mb-2',
    padding: 'p-5',
  },
};

export function sectionHeaderClass(tokens: ThemeTokens): string {
  return `${tokens.sectionHeaderSize} font-bold uppercase tracking-wider pb-1 mb-2`;
}

export function sectionHeaderStyle(tokens: ThemeTokens): CSSProperties {
  return { color: tokens.accent, borderBottom: `1px solid ${tokens.accent}30` };
}
