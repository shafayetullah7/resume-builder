import type {
  Experience,
  ResumeData,
  SectionVisibility,
  ThemeId,
} from '../types/resume';
import {
  CURRENT_SCHEMA_VERSION,
  defaultSectionVisibility,
} from '../types/resume';

const VALID_THEMES: ThemeId[] = ['classic', 'modern-split'];

export function normalizeTheme(theme: unknown): ThemeId {
  return VALID_THEMES.includes(theme as ThemeId) ? (theme as ThemeId) : 'classic';
}

function migrateExperience(exp: Experience): Experience {
  return {
    ...exp,
    location: exp.location ?? '',
    format: exp.format ?? 'paragraph',
    bullets: exp.bullets ?? [],
    experienceProjects: (exp.experienceProjects ?? []).map((proj) => ({
      ...proj,
      format: proj.format ?? 'paragraph',
      bullets: proj.bullets ?? [],
      projectDescription: proj.projectDescription ?? '',
      description: proj.description ?? '',
    })),
  };
}

export function migrateResumeData(raw: Partial<ResumeData>): ResumeData {
  const version = typeof raw.schemaVersion === 'number' ? raw.schemaVersion : 1;

  const data = { ...raw } as ResumeData;

  if (version < 2) {
    data.experience = (data.experience ?? []).map(migrateExperience);
    data.sectionVisibility = defaultSectionVisibility();
    data.schemaVersion = CURRENT_SCHEMA_VERSION;
  }

  data.theme = normalizeTheme(data.theme);
  data.schemaVersion = CURRENT_SCHEMA_VERSION;
  data.sectionVisibility = {
    ...defaultSectionVisibility(),
    ...(data.sectionVisibility ?? {}),
  } as SectionVisibility;
  data.experience = (data.experience ?? []).map(migrateExperience);

  const legacyInterestsLabels = ['Future Focus', 'Currently Exploring'];
  if (legacyInterestsLabels.includes(data.sectionLabels?.interests ?? '')) {
    data.sectionLabels = { ...data.sectionLabels, interests: 'Learning & Interests' };
  }

  return data;
}
