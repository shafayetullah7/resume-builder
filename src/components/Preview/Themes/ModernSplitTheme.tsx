import React from 'react';
import { useResume } from '../../../store/ResumeContext';
import type { SkillCategory, Education, Experience, Project, Language } from '../../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Github, Award, ExternalLink } from 'lucide-react';

const ModernSplitTheme: React.FC = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, languages, interests, certifications, interestsFormat, interestsParagraph, sectionLabels } = resumeData;

    const getHostname = (url: string) => {
        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '');
        } catch {
            return url;
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const [year, month] = dateStr.split('-');
        if (!year) return dateStr;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return month ? `${months[parseInt(month) - 1]} ${year}` : year;
    };

    const formatDateRange = (start: string, end: string, current: boolean) => {
        const startStr = formatDate(start);
        const endStr = current ? 'Present' : formatDate(end);
        return startStr && endStr ? `${startStr} — ${endStr}` : startStr || endStr || '';
    };

    return (
        <div className="w-[210mm] min-h-[297mm] mx-auto bg-white text-gray-800 font-sans box-border flex flex-row shadow-2xl">

            {/* Left Sidebar - Narrow - Skills, Education, Languages, Certifications, Interests */}
            <div className="w-[30%] min-h-[297mm] bg-[#f8f9fa] p-4 border-r border-gray-200">

                {/* Name and Title */}
                <div className="mb-4">
                    <h1 className="text-lg font-bold uppercase tracking-tight text-[#547690] whitespace-pre-wrap leading-tight mb-1" style={{ wordBreak: 'keep-all' }}>
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <p className="text-sm font-medium text-blue-700">{personalInfo.jobTitle || 'Your Job Title'}</p>
                </div>

                {/* Contact Info */}
                <div className="mb-3">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>{sectionLabels.contact}</h2>
                    <div className="flex flex-col gap-1 text-xs text-gray-700">
                        {personalInfo.email && (
                            <div className="flex items-center gap-1">
                                <Mail size={12} className="text-blue-700 shrink-0" />
                                <a href={`mailto:${personalInfo.email}`} className="text-blue-700 hover:underline">{personalInfo.email}</a>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-1">
                                <Phone size={12} className="text-blue-700 shrink-0" />
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.address && (
                            <div className="flex items-start gap-1">
                                <MapPin size={12} className="text-blue-700 mt-0.5 shrink-0" />
                                <span>{personalInfo.address}</span>
                            </div>
                        )}
                        {personalInfo.linkedinUrl && (
                            <div className="flex items-center gap-1">
                                <Linkedin size={12} className="text-blue-700 shrink-0" />
                                <a href={personalInfo.linkedinUrl} className="text-blue-700 hover:underline">{getHostname(personalInfo.linkedinUrl)}</a>
                            </div>
                        )}
                        {personalInfo.githubUrl && (
                            <div className="flex items-center gap-1">
                                <Github size={12} className="text-blue-700 shrink-0" />
                                <a href={personalInfo.githubUrl} className="text-blue-700 hover:underline">{getHostname(personalInfo.githubUrl)}</a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="mb-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                            {sectionLabels.skills}
                        </h2>
                        <div className="flex flex-col gap-2">
                            {skills.map((skillCat: SkillCategory) => (
                                <div key={skillCat.id}>
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 block">{skillCat.category}</span>
                                    <span className="text-xs text-gray-700">{skillCat.skills.join(', ')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div className="mb-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                            {sectionLabels.education}
                        </h2>
                        <div className="flex flex-col gap-2">
                            {education.map((edu: Education) => (
                                <div key={edu.id}>
                                    <span className="text-xs font-semibold text-gray-800 block">{edu.degree}</span>
                                    <span className="text-xs text-gray-600">{edu.institution}</span>
                                    <span className="text-xs text-gray-500 block">{formatDateRange(edu.startDate, edu.endDate, false)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <div className="mb-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                            {sectionLabels.certifications}
                        </h2>
                        <div className="flex flex-col gap-2">
                            {certifications.map((cert: any) => (
                                <div key={cert.id} className="flex items-center gap-1">
                                    <Award size={10} className="text-blue-700 shrink-0" />
                                    <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                                    <span className="text-xs text-gray-500">({formatDate(cert.date)})</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                    <div className="mb-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                            {sectionLabels.languages}
                        </h2>
                        <div className="flex flex-col gap-1">
                            {languages.map((lang: Language) => (
                                <div key={lang.id} className="flex justify-between">
                                    <span className="text-xs font-semibold text-gray-800">{lang.name}</span>
                                    <span className="text-xs text-gray-600">{lang.level}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests */}
                {interestsFormat === 'paragraph' ? (
                    interestsParagraph.trim() && (
                        <div className="mb-3">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                                {sectionLabels.interests}
                            </h2>
                            <p className="text-xs text-gray-700">{interestsParagraph}</p>
                        </div>
                    )
                ) : (
                    interests && interests.length > 0 && (
                        <div className="mb-3">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                                {sectionLabels.interests}
                            </h2>
                            <div className="flex flex-wrap gap-1">
                                {interests.map((interest: any) => (
                                    <span key={interest.id} className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-700">{interest.name}</span>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* Right Main Content - Summary, Experience, Projects */}
            <div className="w-[70%] p-5 flex flex-col gap-4">

                {/* Profile Summary */}
                {personalInfo.summary && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                            {sectionLabels.profile}
                        </h2>
                        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                            {sectionLabels.experience}
                        </h2>
                        <div className="flex flex-col gap-3">
                            {experience.map((exp: Experience) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-xs font-bold text-gray-800">{exp.position}</h3>
                                        <span className="text-xs text-gray-500">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                                    </div>
                                    <p className="text-xs font-medium text-blue-700">{exp.company}</p>
                                    {exp.description && (
                                        <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{exp.description}</p>
                                    )}
                                    {exp.experienceProjects && exp.experienceProjects.length > 0 && (
                                        <div className="mt-2 ml-2 border-l border-gray-300 pl-2">
                                            {exp.experienceProjects.map((proj: any) => (
                                                <div key={proj.id} className="mb-2">
                                                    <span className="text-xs font-semibold text-gray-800">{proj.name}</span>
                                                    {proj.format === 'paragraph' && proj.description && (
                                                        <p className="text-xs text-gray-600"> - {proj.description}</p>
                                                    )}
                                                    {proj.format === 'bullets' && proj.bullets.length > 0 && (
                                                        <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                                                            {proj.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                            {sectionLabels.projects}
                        </h2>
                        <div className="flex flex-col gap-2">
                            {projects.map((proj: Project) => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-xs font-bold text-gray-800">{proj.name}</span>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink size={10} className="text-blue-700" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-700">{proj.description}</p>
                                    {proj.technologies.length > 0 && (
                                        <p className="text-xs text-blue-600 mt-0.5">{proj.technologies.join(' | ')}</p>
                                    )}
                                    {proj.highlights.length > 0 && (
                                        <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                                            {proj.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ModernSplitTheme;
