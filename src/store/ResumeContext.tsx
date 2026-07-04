import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import type {
  ResumeData,
  PersonalInfo,
  Experience,
  Education,
  SkillCategory,
  Project,
  Language,
  SectionLabels,
  Certification,
  CoverLetter,
  ResumeProgress,
  ThemeId,
  SectionVisibility,
} from '../types/resume';
import {
  CURRENT_SCHEMA_VERSION,
  defaultSectionVisibility,
} from '../types/resume';
import calculateProgress from '../utils/progressCalculator';
import { migrateResumeData } from '../utils/schemaMigration';

const initialData: ResumeData = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  theme: 'classic',
  personalInfo: {
    fullName: 'Jane Doe',
    jobTitle: 'Senior Frontend Engineer',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    portfolioUrl: 'https://janedoe.dev',
    linkedinUrl: 'https://linkedin.com/in/janedoe',
    githubUrl: 'https://github.com/janedoe',
    whatsapp: '+1 (555) 987-6543',
    summary:
      'A passionate and detail-oriented frontend engineer with over 5 years of experience building modern, responsive, and accessible web applications using React and TypeScript. Demonstrated ability to lead technical initiatives and mentor team members.',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Innovators Inc.',
      position: 'Senior Frontend Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-01',
      endDate: '',
      current: true,
      format: 'bullets',
      bullets: [
        'Led development of the core customer portal serving 50K+ monthly active users.',
        'Established team coding standards and mentored 3 junior developers.',
      ],
      description: '',
      experienceProjects: [
        {
          id: '1-proj-1',
          name: 'Core Customer Portal',
          projectDescription: 'Customer-facing portal for managing subscriptions and billing',
          format: 'paragraph',
          description:
            'Led the frontend architecture and development using React and TypeScript. Improved load time by 40% through code splitting and lazy loading.',
          bullets: [],
        },
        {
          id: '1-proj-2',
          name: 'Design System Migration',
          projectDescription: 'Unified UI component library used across all products',
          format: 'bullets',
          description: '',
          bullets: [
            'Spearheaded the migration to a unified Tailwind CSS design system.',
            'Mentored 3 junior developers during the transition.',
          ],
        },
      ],
    },
    {
      id: '2',
      company: 'Web Solutions Ltd.',
      position: 'Frontend Developer',
      location: 'Remote',
      startDate: '2018-06',
      endDate: '2020-12',
      current: false,
      format: 'paragraph',
      bullets: [],
      description:
        'Developed responsive web interfaces for multiple clients. Migrated legacy jQuery applications to React. Collaborated closely with UX designers to implement pixel-perfect user interfaces.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'State University',
      degree: 'Bachelor of Science in Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      description: 'Relevant coursework: Data Structures, Algorithms, Web Development',
    },
  ],
  skills: [
    { id: '1', category: 'Languages', skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML/CSS', 'Python'] },
    { id: '2', category: 'Frameworks & Libraries', skills: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'Node.js'] },
    { id: '3', category: 'Tools', skills: ['Git', 'Webpack', 'Vite', 'Figma', 'Jest'] },
  ],
  projects: [],
  languages: [
    { id: '1', name: 'English', level: 'Native' },
    { id: '2', name: 'Spanish', level: 'Intermediate' },
  ],
  interests: [
    { id: '1', name: 'Cloud Architecture (AWS)' },
    { id: '2', name: 'AI-Native Development' },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect Associate',
      issuer: 'Amazon Web Services',
      date: '2023-03',
      url: 'https://www.credential.net/abc123',
    },
  ],
  interestsFormat: 'bullets',
  interestsParagraph: '',
  sectionLabels: {
    contact: 'Contact',
    profile: 'Profile',
    experience: 'Work Experience',
    education: 'Education and Training',
    skills: 'Skills',
    projects: 'Projects',
    languages: 'Language Skills',
    interests: 'Learning & Interests',
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
};

function loadResumeData(): ResumeData {
  const savedData = localStorage.getItem('resume-builder-data');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      return migrateResumeData({
        ...initialData,
        ...parsed,
        personalInfo: { ...initialData.personalInfo, ...(parsed.personalInfo || {}) },
        sectionLabels: { ...initialData.sectionLabels, ...(parsed.sectionLabels || {}) },
        sectionVisibility: { ...defaultSectionVisibility(), ...(parsed.sectionVisibility || {}) },
        coverLetter: { ...initialData.coverLetter, ...(parsed.coverLetter || {}) },
        experience: parsed.experience || initialData.experience,
        education: parsed.education || initialData.education,
        skills: parsed.skills || initialData.skills,
        projects: parsed.projects || initialData.projects,
        languages: parsed.languages || initialData.languages,
        interests: parsed.interests || initialData.interests,
        certifications: parsed.certifications || initialData.certifications,
      });
    } catch (e) {
      console.error('Failed to parse saved resume data:', e);
      return initialData;
    }
  }
  return initialData;
}

interface ResumeContextType {
  resumeData: ResumeData;
  setTheme: (theme: ThemeId) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  updateSkillCategory: (id: string, data: Partial<SkillCategory>) => void;
  addSkillCategory: () => void;
  removeSkillCategory: (id: string) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  addLanguage: () => void;
  removeLanguage: (id: string) => void;
  updateInterest: (id: string, data: Partial<{ name: string }>) => void;
  addInterest: () => void;
  removeInterest: (id: string) => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  addCertification: () => void;
  removeCertification: (id: string) => void;
  updateInterestsFormat: (format: 'bullets' | 'paragraph') => void;
  updateInterestsParagraph: (text: string) => void;
  updateSectionLabels: (data: Partial<SectionLabels>) => void;
  updateSectionVisibility: (data: Partial<SectionVisibility>) => void;
  updateCoverLetter: (data: Partial<CoverLetter>) => void;
  importResume: (data: Partial<ResumeData>) => void;
  resetData: () => void;
  getProgress: () => ResumeProgress;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(loadResumeData);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem('resume-builder-data', JSON.stringify(resumeData));
    }, 400);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [resumeData]);

  const setTheme = useCallback((theme: ThemeId) => {
    setResumeData((prev) => ({ ...prev, theme }));
  }, []);

  const updatePersonalInfo = useCallback((data: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, ...data } }));
  }, []);

  const updateExperience = useCallback((id: string, data: Partial<Experience>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, ...data } : exp)),
    }));
  }, []);

  const addExperience = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
          format: 'paragraph' as const,
          bullets: [],
          current: false,
          experienceProjects: [],
        },
      ],
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResumeData((prev) => ({ ...prev, experience: prev.experience.filter((exp) => exp.id !== id) }));
  }, []);

  const updateEducation = useCallback((id: string, data: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, ...data } : edu)),
    }));
  }, []);

  const addEducation = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now().toString(), institution: '', degree: '', startDate: '', endDate: '', description: '' },
      ],
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((edu) => edu.id !== id) }));
  }, []);

  const updateSkillCategory = useCallback((id: string, data: Partial<SkillCategory>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, ...data } : skill)),
    }));
  }, []);

  const addSkillCategory = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now().toString(), category: 'New Category', skills: [] }],
    }));
  }, []);

  const removeSkillCategory = useCallback((id: string) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((skill) => skill.id !== id) }));
  }, []);

  const updateProject = useCallback((id: string, data: Partial<Project>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, ...data } : proj)),
    }));
  }, []);

  const addProject = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now().toString(),
          name: 'New Project',
          description: '',
          technologies: [],
          links: [],
          highlights: [],
          startDate: '',
          endDate: '',
        },
      ],
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setResumeData((prev) => ({ ...prev, projects: prev.projects.filter((proj) => proj.id !== id) }));
  }, []);

  const updateLanguage = useCallback((id: string, data: Partial<Language>) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) => (lang.id === id ? { ...lang, ...data } : lang)),
    }));
  }, []);

  const addLanguage = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, { id: Date.now().toString(), name: 'Language', level: 'Intermediate' }],
    }));
  }, []);

  const removeLanguage = useCallback((id: string) => {
    setResumeData((prev) => ({ ...prev, languages: prev.languages.filter((lang) => lang.id !== id) }));
  }, []);

  const updateInterest = useCallback((id: string, data: Partial<{ name: string }>) => {
    setResumeData((prev) => ({
      ...prev,
      interests: prev.interests.map((interest) => (interest.id === id ? { ...interest, ...data } : interest)),
    }));
  }, []);

  const addInterest = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      interests: [...prev.interests, { id: Date.now().toString(), name: 'New Interest' }],
    }));
  }, []);

  const removeInterest = useCallback((id: string) => {
    setResumeData((prev) => ({ ...prev, interests: prev.interests.filter((interest) => interest.id !== id) }));
  }, []);

  const updateCertification = useCallback((id: string, data: Partial<Certification>) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) => (cert.id === id ? { ...cert, ...data } : cert)),
    }));
  }, []);

  const addCertification = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { id: Date.now().toString(), name: 'New Certification', issuer: '', date: '', url: '' },
      ],
    }));
  }, []);

  const removeCertification = useCallback((id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  }, []);

  const updateInterestsFormat = useCallback((format: 'bullets' | 'paragraph') => {
    setResumeData((prev) => ({ ...prev, interestsFormat: format }));
  }, []);

  const updateInterestsParagraph = useCallback((text: string) => {
    setResumeData((prev) => ({ ...prev, interestsParagraph: text }));
  }, []);

  const updateSectionLabels = useCallback((data: Partial<SectionLabels>) => {
    setResumeData((prev) => ({ ...prev, sectionLabels: { ...prev.sectionLabels, ...data } }));
  }, []);

  const updateSectionVisibility = useCallback((data: Partial<SectionVisibility>) => {
    setResumeData((prev) => ({
      ...prev,
      sectionVisibility: { ...prev.sectionVisibility, ...data },
    }));
  }, []);

  const updateCoverLetter = useCallback((data: Partial<CoverLetter>) => {
    setResumeData((prev) => ({ ...prev, coverLetter: { ...prev.coverLetter, ...data } }));
  }, []);

  const importResume = useCallback((data: Partial<ResumeData>) => {
    setResumeData((prev) =>
      migrateResumeData({
        ...prev,
        ...data,
        personalInfo: { ...prev.personalInfo, ...(data.personalInfo || {}) },
        sectionLabels: { ...prev.sectionLabels, ...(data.sectionLabels || {}) },
        sectionVisibility: { ...prev.sectionVisibility, ...(data.sectionVisibility || {}) },
        coverLetter: { ...prev.coverLetter, ...(data.coverLetter || {}) },
        experience: data.experience ?? prev.experience,
        education: data.education ?? prev.education,
        skills: data.skills ?? prev.skills,
        projects: data.projects ?? prev.projects,
        languages: data.languages ?? prev.languages,
        interests: data.interests ?? prev.interests,
        certifications: data.certifications ?? prev.certifications,
      })
    );
  }, []);

  const resetData = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all data and reset to defaults?')) {
      setResumeData(initialData);
      localStorage.removeItem('resume-builder-data');
    }
  }, []);

  const getProgress = useCallback((): ResumeProgress => calculateProgress(resumeData), [resumeData]);

  const value = useMemo(
    () => ({
      resumeData,
      setTheme,
      updatePersonalInfo,
      updateExperience,
      addExperience,
      removeExperience,
      updateEducation,
      addEducation,
      removeEducation,
      updateSkillCategory,
      addSkillCategory,
      removeSkillCategory,
      updateProject,
      addProject,
      removeProject,
      updateLanguage,
      addLanguage,
      removeLanguage,
      updateInterest,
      addInterest,
      removeInterest,
      updateCertification,
      addCertification,
      removeCertification,
      updateInterestsFormat,
      updateInterestsParagraph,
      updateSectionLabels,
      updateSectionVisibility,
      updateCoverLetter,
      importResume,
      resetData,
      getProgress,
    }),
    [
      resumeData,
      setTheme,
      updatePersonalInfo,
      updateExperience,
      addExperience,
      removeExperience,
      updateEducation,
      addEducation,
      removeEducation,
      updateSkillCategory,
      addSkillCategory,
      removeSkillCategory,
      updateProject,
      addProject,
      removeProject,
      updateLanguage,
      addLanguage,
      removeLanguage,
      updateInterest,
      addInterest,
      removeInterest,
      updateCertification,
      addCertification,
      removeCertification,
      updateInterestsFormat,
      updateInterestsParagraph,
      updateSectionLabels,
      updateSectionVisibility,
      updateCoverLetter,
      importResume,
      resetData,
      getProgress,
    ]
  );

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
