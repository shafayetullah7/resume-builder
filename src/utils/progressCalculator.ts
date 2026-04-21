import type { ResumeData } from '../types/resume';

interface SectionProgress {
    name: string;
    filled: number;
    total: number;
    percentage: number;
}

const calculateProgress = (data: ResumeData): { overall: number; sections: SectionProgress[] } => {
    const sections: SectionProgress[] = [];
    
    const personalInfoFilled = 
        (data.personalInfo.fullName ? 1 : 0) +
        (data.personalInfo.jobTitle ? 1 : 0) +
        (data.personalInfo.email ? 1 : 0) +
        (data.personalInfo.phone ? 1 : 0) +
        (data.personalInfo.summary ? 1 : 0);
    sections.push({
        name: 'Personal Info',
        filled: personalInfoFilled,
        total: 5,
        percentage: Math.round((personalInfoFilled / 5) * 100)
    });

    const experienceFilled = 
        (data.experience.length > 0 ? 1 : 0) +
        (data.experience.some(e => e.company) ? 1 : 0) +
        (data.experience.some(e => e.position) ? 1 : 0) +
        (data.experience.some(e => e.description) ? 1 : 0);
    sections.push({
        name: 'Experience',
        filled: experienceFilled,
        total: 4,
        percentage: Math.round((experienceFilled / 4) * 100)
    });

    const educationFilled = 
        (data.education.length > 0 ? 1 : 0) +
        (data.education.some(e => e.institution) ? 1 : 0) +
        (data.education.some(e => e.degree) ? 1 : 0);
    sections.push({
        name: 'Education',
        filled: educationFilled,
        total: 3,
        percentage: Math.round((educationFilled / 3) * 100)
    });

    const skillsFilled = 
        (data.skills.length > 0 ? 1 : 0) +
        (data.skills.some(s => s.category && s.skills.length > 0) ? 1 : 0);
    sections.push({
        name: 'Skills',
        filled: skillsFilled,
        total: 2,
        percentage: Math.round((skillsFilled / 2) * 100)
    });

    const projectsFilled = 
        (data.projects.length > 0 ? 1 : 0) +
        (data.projects.some(p => p.name) ? 1 : 0) +
        (data.projects.some(p => p.description) ? 1 : 0);
    sections.push({
        name: 'Projects',
        filled: projectsFilled,
        total: 3,
        percentage: Math.round((projectsFilled / 3) * 100)
    });

    const languagesFilled = 
        (data.languages.length > 0 ? 1 : 0) +
        (data.languages.some(l => l.name) ? 1 : 0);
    sections.push({
        name: 'Languages',
        filled: languagesFilled,
        total: 2,
        percentage: Math.round((languagesFilled / 2) * 100)
    });

    const interestsFilled = 
        (data.interests.length > 0 ? 1 : 0) +
        (data.interests.some(i => i.name) ? 1 : 0);
    sections.push({
        name: 'Interests',
        filled: interestsFilled,
        total: 2,
        percentage: Math.round((interestsFilled / 2) * 100)
    });

    const certificationsFilled = 
        (data.certifications.length > 0 ? 1 : 0) +
        (data.certifications.some(c => c.name) ? 1 : 0);
    sections.push({
        name: 'Certifications',
        filled: certificationsFilled,
        total: 2,
        percentage: Math.round((certificationsFilled / 2) * 100)
    });

    const totalFilled = sections.reduce((sum, s) => sum + s.filled, 0);
    const totalRequired = sections.reduce((sum, s) => sum + s.total, 0);
    const overall = Math.round((totalFilled / totalRequired) * 100);

    return { overall, sections };
};

export default calculateProgress;
