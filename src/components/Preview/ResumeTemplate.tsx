import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Mail, Phone, MapPin, Link as LinkIcon, Linkedin, Github } from 'lucide-react';

const ResumeTemplate: React.FC = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills } = resumeData;

    const getHostname = (url: string) => {
        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '');
        } catch {
            return url;
        }
    };

    return (
        <div className="w-full h-full bg-white text-gray-800 p-8 md:p-10 lg:p-12 font-sans box-border">
            {/* Header section */}
            <header className="mb-6 border-b-2 border-gray-800 pb-4">
                <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900 mb-1">
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <h2 className="text-xl font-medium text-primary-700 mb-4">
                    {personalInfo.jobTitle || 'Your Job Title'}
                </h2>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} className="text-gray-500" />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={14} className="text-gray-500" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-gray-500" />
                            <span>{personalInfo.address}</span>
                        </div>
                    )}
                    {personalInfo.portfolioUrl && (
                        <div className="flex items-center gap-1.5">
                            <LinkIcon size={14} className="text-gray-500" />
                            <a href={personalInfo.portfolioUrl} className="hover:text-primary-600">
                                {getHostname(personalInfo.portfolioUrl)}
                            </a>
                        </div>
                    )}
                    {personalInfo.linkedinUrl && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin size={14} className="text-gray-500" />
                            <a href={personalInfo.linkedinUrl} className="hover:text-primary-600">
                                {getHostname(personalInfo.linkedinUrl)}
                            </a>
                        </div>
                    )}
                    {personalInfo.githubUrl && (
                        <div className="flex items-center gap-1.5">
                            <Github size={14} className="text-gray-500" />
                            <a href={personalInfo.githubUrl} className="hover:text-primary-600">
                                {getHostname(personalInfo.githubUrl)}
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="mb-6">
                    <p className="text-sm leading-relaxed text-gray-700">
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            {/* Main Content Split View (Optional, but let's stick to vertical for robustness or two-column depending on aesthetics) */}
            <div className="flex flex-col gap-6">

                {/* Experience Section */}
                {experience.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
                            Experience
                        </h3>
                        <div className="flex flex-col gap-4">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-gray-800">{exp.position}</h4>
                                        <span className="text-xs font-semibold text-gray-500 uppercase">
                                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-primary-700 mb-2">
                                        {exp.company}
                                    </div>
                                    {exp.description && (
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {exp.description}
                                        </p>
                                    )}

                                    {exp.experienceProjects && exp.experienceProjects.length > 0 && (
                                        <div className="mt-3">
                                            <h5 className="text-sm font-semibold text-gray-800 mb-2">Projects details:</h5>
                                            <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-200">
                                                {exp.experienceProjects.map(proj => (
                                                    <div key={proj.id}>
                                                        <div className="text-sm font-bold text-gray-800 mb-1">{proj.name}</div>
                                                        {proj.format === 'paragraph' && proj.description && (
                                                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                                {proj.description}
                                                            </p>
                                                        )}
                                                        {proj.format === 'bullets' && proj.bullets.length > 0 && (
                                                            <ul className="text-sm text-gray-700 list-disc list-inside leading-relaxed space-y-1">
                                                                {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {education.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
                            Education
                        </h3>
                        <div className="flex flex-col gap-3">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                                        <span className="text-xs font-semibold text-gray-500 uppercase">
                                            {edu.startDate} – {edu.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-700">
                                        {edu.institution}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                {skills.length > 0 && (
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
                            Skills
                        </h3>
                        <div className="flex flex-col gap-2">
                            {skills.map((skillCat) => (
                                <div key={skillCat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                                    <h4 className="font-bold text-gray-800 text-sm whitespace-nowrap min-w-[120px]">
                                        {skillCat.category}:
                                    </h4>
                                    <p className="text-sm text-gray-700">
                                        {skillCat.skills.join(', ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ResumeTemplate;
