import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ResumeData, PersonalInfo, Experience, Education, SkillCategory, Project, Language, SectionLabels } from '../types/resume';

const initialData: ResumeData = {
    theme: 'modern-split',
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
        dateOfBirth: '01/01/1990',
        nationality: 'American',
        gender: 'Female',
        summary: 'A passionate and detail-oriented frontend engineer with over 5 years of experience building modern, responsive, and accessible web applications using React and TypeScript. Demonstrated ability to lead technical initiatives and mentor team members.',
    },
    experience: [
        {
            id: '1',
            company: 'Tech Innovators Inc.',
            position: 'Senior Frontend Engineer',
            startDate: '2021-01',
            endDate: '',
            current: true,
            description: 'Led the development of the core customer portal and established team coding standards.',
            experienceProjects: [
                {
                    id: '1-proj-1',
                    name: 'Core Customer Portal',
                    format: 'paragraph',
                    description: 'Led the frontend architecture and development using React and TypeScript. Improved load time by 40% through code splitting and lazy loading.',
                    bullets: []
                },
                {
                    id: '1-proj-2',
                    name: 'Design System Migration',
                    format: 'bullets',
                    description: '',
                    bullets: [
                        'Spearheaded the migration to a unified Tailwind CSS design system.',
                        'Mentored 3 junior developers during the transition.'
                    ]
                }
            ]
        },
        {
            id: '2',
            company: 'Web Solutions Ltd.',
            position: 'Frontend Developer',
            startDate: '2018-06',
            endDate: '2020-12',
            current: false,
            description: 'Developed responsive web interfaces for multiple clients. Migrated legacy jQuery applications to React. Collaborated closely with UX designers to implement pixel-perfect user interfaces.',
        },
    ],
    education: [
        {
            id: '1',
            institution: 'State University',
            degree: 'Bachelor of Science in Computer Science',
            startDate: '2014-09',
            endDate: '2018-05',
        },
    ],
    skills: [
        {
            id: '1',
            category: 'Languages',
            skills: ['JavaScript (ES6+)', 'TypeScript', 'HTML/CSS', 'Python'],
        },
        {
            id: '2',
            category: 'Frameworks & Libraries',
            skills: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'Node.js'],
        },
        {
            id: '3',
            category: 'Tools',
            skills: ['Git', 'Webpack', 'Vite', 'Figma', 'Jest'],
        }
    ],
    projects: [
        {
            id: '1',
            name: 'Open Source Dashboard',
            description: 'Analytics dashboard built for open source maintainers.',
            technologies: ['React', 'D3.js', 'Firebase'],
            link: 'https://github.com/janedoe/dashboard',
            highlights: ['Used by over 500 maintainers', 'Reduced loading state overhead by 20%'],
            startDate: '2022-01',
            endDate: '2022-06'
        }
    ],
    languages: [
        {
            id: '1',
            name: 'English',
            level: 'Native'
        },
        {
            id: '2',
            name: 'Spanish',
            level: 'Intermediate'
        }
    ],
    interests: [
        {
            id: '1',
            name: 'Cloud Architecture (AWS)'
        },
        {
            id: '2',
            name: 'AI-Native Development'
        }
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
        interests: 'Future Focus',
    }
};

interface ResumeContextType {
    resumeData: ResumeData;
    setTheme: (theme: string) => void;
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
    updateInterestsFormat: (format: 'bullets' | 'paragraph') => void;
    updateInterestsParagraph: (text: string) => void;
    updateSectionLabels: (data: Partial<SectionLabels>) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [resumeData, setResumeData] = useState<ResumeData>(initialData);

    const setTheme = (theme: string) => setResumeData(prev => ({ ...prev, theme }));

    const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
        setResumeData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, ...data },
        }));
    };

    const updateExperience = (id: string, data: Partial<Experience>) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, ...data } : exp)),
        }));
    };

    const addExperience = () => {
        setResumeData((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                {
                    id: Date.now().toString(),
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    current: false,
                    experienceProjects: [],
                },
            ],
        }));
    };

    const removeExperience = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            experience: prev.experience.filter((exp) => exp.id !== id),
        }));
    };

    const updateEducation = (id: string, data: Partial<Education>) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.map((edu) => (edu.id === id ? { ...edu, ...data } : edu)),
        }));
    };

    const addEducation = () => {
        setResumeData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    id: Date.now().toString(),
                    institution: '',
                    degree: '',
                    startDate: '',
                    endDate: '',
                },
            ],
        }));
    };

    const removeEducation = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            education: prev.education.filter((edu) => edu.id !== id),
        }));
    };

    const updateSkillCategory = (id: string, data: Partial<SkillCategory>) => {
        setResumeData((prev) => ({
            ...prev,
            skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, ...data } : skill)),
        }));
    };

    const addSkillCategory = () => {
        setResumeData((prev) => ({
            ...prev,
            skills: [
                ...prev.skills,
                {
                    id: Date.now().toString(),
                    category: 'New Category',
                    skills: [],
                },
            ],
        }));
    };

    const removeSkillCategory = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill.id !== id),
        }));
    };

    const updateProject = (id: string, data: Partial<Project>) => {
        setResumeData((prev) => ({
            ...prev,
            projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, ...data } : proj)),
        }));
    };

    const addProject = () => {
        setResumeData((prev) => ({
            ...prev,
            projects: [
                ...prev.projects,
                {
                    id: Date.now().toString(),
                    name: 'New Project',
                    description: '',
                    technologies: [],
                    link: '',
                    highlights: [],
                },
            ],
        }));
    };

    const removeProject = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            projects: prev.projects.filter((proj) => proj.id !== id),
        }));
    };

    const updateLanguage = (id: string, data: Partial<Language>) => {
        setResumeData((prev) => ({
            ...prev,
            languages: prev.languages.map((lang) => (lang.id === id ? { ...lang, ...data } : lang)),
        }));
    };

    const addLanguage = () => {
        setResumeData((prev) => ({
            ...prev,
            languages: [
                ...prev.languages,
                {
                    id: Date.now().toString(),
                    name: 'Language',
                    level: 'Intermediate',
                },
            ],
        }));
    };

    const removeLanguage = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            languages: prev.languages.filter((lang) => lang.id !== id),
        }));
    };

    const updateInterest = (id: string, data: Partial<{ name: string }>) => {
        setResumeData((prev) => ({
            ...prev,
            interests: prev.interests.map((interest) => (interest.id === id ? { ...interest, ...data } : interest)),
        }));
    };

    const addInterest = () => {
        setResumeData((prev) => ({
            ...prev,
            interests: [
                ...prev.interests,
                {
                    id: Date.now().toString(),
                    name: 'New Interest',
                },
            ],
        }));
    };

    const removeInterest = (id: string) => {
        setResumeData((prev) => ({
            ...prev,
            interests: prev.interests.filter((interest) => interest.id !== id),
        }));
    };

    const updateInterestsFormat = (format: 'bullets' | 'paragraph') => {
        setResumeData((prev) => ({
            ...prev,
            interestsFormat: format,
        }));
    };

    const updateInterestsParagraph = (text: string) => {
        setResumeData((prev) => ({
            ...prev,
            interestsParagraph: text,
        }));
    };

    const updateSectionLabels = (data: Partial<SectionLabels>) => {
        setResumeData((prev) => ({
            ...prev,
            sectionLabels: { ...prev.sectionLabels, ...data },
        }));
    };

    return (
        <ResumeContext.Provider
            value={{
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
                updateInterestsFormat,
                updateInterestsParagraph,
                updateSectionLabels,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
