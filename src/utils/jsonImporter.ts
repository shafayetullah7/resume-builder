import { CURRENT_SCHEMA_VERSION, defaultSectionVisibility } from '../types/resume';
import { migrateResumeData } from './schemaMigration';
import type { ResumeData } from '../types/resume';

export const getJsonTemplate = () => ({
  schemaVersion: CURRENT_SCHEMA_VERSION,
  theme: 'classic',
  personalInfo: {
    fullName: 'John Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    githubUrl: 'https://github.com/johndoe',
    gitlabUrl: 'https://gitlab.com/johndoe',
    portfolioUrl: 'https://johndoe.dev',
    whatsapp: '+1 (555) 987-6543',
    summary: 'Experienced software engineer with 5+ years...',
  },
  experience: [
    {
      company: 'Tech Company Inc.',
      position: 'Senior Software Engineer',
      location: 'Remote',
      startDate: '2021-01',
      endDate: '',
      current: true,
      format: 'bullets',
      description: '',
      bullets: ['Led development of core platform', 'Improved performance by 40%'],
      experienceProjects: [
        {
          name: 'Project Name',
          projectDescription: 'Brief description of what the project is',
          format: 'bullets',
          description: '',
          bullets: ['Achievement 1', 'Achievement 2'],
          liveLink: 'https://example.com',
        },
      ],
    },
  ],
  education: [
    {
      institution: 'University Name',
      degree: 'Bachelor of Science in Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      description: 'Relevant coursework: Data Structures, Algorithms...',
    },
  ],
  skills: [
    { category: 'Programming Languages', skills: ['JavaScript', 'TypeScript', 'Python'] },
    { category: 'Frameworks', skills: ['React', 'Node.js'] },
  ],
  projects: [
    {
      name: 'Project Name',
      description: 'Built a web application...',
      technologies: ['React', 'TypeScript'],
      links: [
        { label: 'Live Demo', liveUrl: 'https://example.com', githubUrl: 'https://github.com/username/project' },
      ],
      highlights: ['Achieved 50% performance improvement', 'Used by 1000+ users'],
      startDate: '2023-01',
      endDate: '2023-06',
    },
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'Intermediate' },
  ],
  interests: [{ name: 'Open Source' }, { name: 'Machine Learning' }],
  interestsFormat: 'bullets',
  interestsParagraph: '',
  certifications: [
    { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023-01', url: 'https://...' },
  ],
  sectionLabels: {
    contact: 'Contact',
    profile: 'Profile',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    languages: 'Languages',
    interests: 'Interests',
    certifications: 'Certifications',
  },
  sectionVisibility: defaultSectionVisibility(),
  coverLetter: {
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    companyAddress: '',
    content: '',
  },
});

export const validateResumeJson = (json: unknown): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const data = json as Record<string, unknown>;

  if (!json) {
    errors.push('Empty JSON');
    return { valid: false, errors };
  }

  const personalInfo = data.personalInfo as Record<string, unknown> | undefined;
  if (personalInfo) {
    if (typeof personalInfo.fullName !== 'string') errors.push('personalInfo.fullName must be a string');
    if (typeof personalInfo.email !== 'string') errors.push('personalInfo.email must be a string');
    if (typeof personalInfo.jobTitle !== 'string') errors.push('personalInfo.jobTitle must be a string');
  } else {
    errors.push('Missing personalInfo object');
  }

  if (!Array.isArray(data.experience)) errors.push('experience must be an array');
  if (!Array.isArray(data.education)) errors.push('education must be an array');
  if (!Array.isArray(data.skills)) errors.push('skills must be an array');

  return { valid: errors.length === 0, errors };
};

export const parseJsonResume = (jsonString: string): Partial<ResumeData> => {
  let json: unknown;

  try {
    json = JSON.parse(jsonString);
  } catch {
    throw new Error('Invalid JSON format');
  }

  const validation = validateResumeJson(json);
  if (!validation.valid) {
    throw new Error(`Invalid resume JSON: ${validation.errors.join(', ')}`);
  }

  const data = json as Record<string, unknown>;
  const now = Date.now();

  const parsed: Partial<ResumeData> = {
    schemaVersion: typeof data.schemaVersion === 'number' ? data.schemaVersion : CURRENT_SCHEMA_VERSION,
    theme: data.theme as ResumeData['theme'],
    personalInfo: {
      fullName: (data.personalInfo as Record<string, string>)?.fullName || '',
      jobTitle: (data.personalInfo as Record<string, string>)?.jobTitle || '',
      email: (data.personalInfo as Record<string, string>)?.email || '',
      phone: (data.personalInfo as Record<string, string>)?.phone || '',
      address: (data.personalInfo as Record<string, string>)?.address || '',
      linkedinUrl: (data.personalInfo as Record<string, string>)?.linkedinUrl || '',
      githubUrl: (data.personalInfo as Record<string, string>)?.githubUrl || '',
      gitlabUrl: (data.personalInfo as Record<string, string>)?.gitlabUrl || '',
      portfolioUrl: (data.personalInfo as Record<string, string>)?.portfolioUrl || '',
      whatsapp: (data.personalInfo as Record<string, string>)?.whatsapp || '',
      dateOfBirth: (data.personalInfo as Record<string, string>)?.dateOfBirth || '',
      nationality: (data.personalInfo as Record<string, string>)?.nationality || '',
      gender: (data.personalInfo as Record<string, string>)?.gender || '',
      summary: (data.personalInfo as Record<string, string>)?.summary || '',
    },
    experience: ((data.experience as unknown[]) || []).map((exp, idx) => {
      const e = exp as Record<string, unknown>;
      return {
        id: `exp-${now}-${idx}`,
        company: (e.company as string) || '',
        position: (e.position as string) || '',
        location: (e.location as string) || '',
        startDate: (e.startDate as string) || '',
        endDate: (e.endDate as string) || '',
        current: (e.current as boolean) || false,
        format: (e.format as 'paragraph' | 'bullets') || 'paragraph',
        description: (e.description as string) || '',
        bullets: (e.bullets as string[]) || [],
        experienceProjects: ((e.experienceProjects as unknown[]) || []).map((proj, pidx) => {
          const p = proj as Record<string, unknown>;
          return {
            id: `proj-${now}-${idx}-${pidx}`,
            name: (p.name as string) || '',
            projectDescription: (p.projectDescription as string) || '',
            format: (p.format as 'paragraph' | 'bullets') || 'bullets',
            description: (p.description as string) || '',
            bullets: (p.bullets as string[]) || [],
            liveLink: (p.liveLink as string) || '',
          };
        }),
      };
    }),
    education: ((data.education as unknown[]) || []).map((edu, idx) => {
      const e = edu as Record<string, unknown>;
      return {
        id: `edu-${now}-${idx}`,
        institution: (e.institution as string) || '',
        degree: (e.degree as string) || '',
        startDate: (e.startDate as string) || '',
        endDate: (e.endDate as string) || '',
        description: (e.description as string) || '',
      };
    }),
    skills: ((data.skills as unknown[]) || []).map((skill, idx) => {
      const s = skill as Record<string, unknown>;
      return {
        id: `skill-${now}-${idx}`,
        category: (s.category as string) || 'Skills',
        skills: (s.skills as string[]) || [],
      };
    }),
    projects: ((data.projects as unknown[]) || []).map((proj, idx) => {
      const p = proj as Record<string, unknown>;
      return {
        id: `proj-${now}-${idx}`,
        name: (p.name as string) || '',
        description: (p.description as string) || '',
        technologies: (p.technologies as string[]) || [],
        links: ((p.links as unknown[]) || []).map((link) => {
          const l = link as Record<string, string>;
          return { label: l.label || '', liveUrl: l.liveUrl || '', githubUrl: l.githubUrl || '' };
        }),
        highlights: (p.highlights as string[]) || [],
        startDate: (p.startDate as string) || '',
        endDate: (p.endDate as string) || '',
      };
    }),
    languages: ((data.languages as unknown[]) || []).map((lang, idx) => {
      const l = lang as Record<string, string>;
      return { id: `lang-${now}-${idx}`, name: l.name || '', level: l.level || '' };
    }),
    interests: ((data.interests as unknown[]) || []).map((interest, idx) => {
      const i = interest as Record<string, string>;
      return { id: `interest-${now}-${idx}`, name: i.name || '' };
    }),
    certifications: ((data.certifications as unknown[]) || []).map((cert, idx) => {
      const c = cert as Record<string, string>;
      return {
        id: `cert-${now}-${idx}`,
        name: c.name || '',
        issuer: c.issuer || '',
        date: c.date || '',
        url: c.url || '',
      };
    }),
    interestsFormat: (data.interestsFormat as 'bullets' | 'paragraph') || 'bullets',
    interestsParagraph: (data.interestsParagraph as string) || '',
    sectionLabels: data.sectionLabels as ResumeData['sectionLabels'],
    sectionVisibility: data.sectionVisibility as ResumeData['sectionVisibility'],
    coverLetter: data.coverLetter as ResumeData['coverLetter'],
  };

  return migrateResumeData(parsed as ResumeData);
};
