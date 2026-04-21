import React from 'react';
import { useResume } from '../../../store/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Award, ExternalLink } from 'lucide-react';
import type { Project, Experience } from '../../../types/resume';

const ModernSplitTheme: React.FC = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, languages, interests, certifications, sectionLabels, interestsFormat, interestsParagraph } = resumeData;

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
        <div className="w-full h-full bg-white text-gray-800 font-sans box-border overflow-hidden">
            <div className="flex h-full">
                {/* Left Sidebar */}
                <div className="w-1/3 bg-[#f5f5f5] p-6 flex flex-col gap-4">
                    {/* Contact Info */}
                    <div className="border-b border-gray-300 pb-4">
                        <h1 className="text-xl font-bold text-[#547690] uppercase tracking-wide mb-1">
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <p className="text-sm text-gray-600 font-medium mb-3">
                            {personalInfo.jobTitle || 'Your Job Title'}
                        </p>

                        <div className="flex flex-col gap-1.5 text-xs text-gray-700">
                            {personalInfo.email && (
                                <div className="flex items-center gap-2">
                                    <Mail size={12} className="text-[#547690]" />
                                    <a href={`mailto:${personalInfo.email}`} className="hover:text-[#547690]">{personalInfo.email}</a>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={12} className="text-[#547690]" />
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo.address && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={12} className="text-[#547690]" />
                                    <span>{personalInfo.address}</span>
                                </div>
                            )}
                            {personalInfo.linkedinUrl && (
                                <div className="flex items-center gap-2">
                                    <Linkedin size={12} className="text-[#547690]" />
                                    <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#547690]">LinkedIn</a>
                                </div>
                            )}
                            {personalInfo.githubUrl && (
                                <div className="flex items-center gap-2">
                                    <Github size={12} className="text-[#547690]" />
                                    <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#547690]">GitHub</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                                {sectionLabels.skills}
                            </h2>
                            <div className="flex flex-col gap-2">
                                {skills.map((skillCat) => (
                                    <div key={skillCat.id}>
                                        <span className="text-xs font-semibold text-gray-800 block">{skillCat.category}</span>
                                        <span className="text-xs text-gray-600">{skillCat.skills.join(', ')}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                                {sectionLabels.education}
                            </h2>
                            <div className="flex flex-col gap-2">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <span className="text-xs font-semibold text-gray-800 block">{edu.degree}</span>
                                        <span className="text-xs text-gray-600">{edu.institution}</span>
                                        <span className="text-xs text-gray-500 block">{formatDateRange(edu.startDate, edu.endDate, false)}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                                {sectionLabels.certifications}
                            </h2>
                            <div className="flex flex-col gap-2">
                                {certifications.map((cert) => (
                                    <div key={cert.id}>
                                        <div className="flex items-center gap-1">
                                            <Award size={10} className="text-[#547690]" />
                                            <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 ml-4">{cert.issuer} ({formatDate(cert.date)})</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                                {sectionLabels.languages}
                            </h2>
                            <div className="flex flex-col gap-1">
                                {languages.map((lang) => (
                                    <div key={lang.id} className="flex justify-between">
                                        <span className="text-xs font-semibold text-gray-800">{lang.name}</span>
                                        <span className="text-xs text-gray-500">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests */}
                    {interests.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#547690] mb-2 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                                {sectionLabels.interests}
                            </h2>
                            {interestsFormat === 'paragraph' && interestsParagraph ? (
                                <p className="text-xs text-gray-600">{interestsParagraph}</p>
                            ) : (
                                <div className="flex flex-wrap gap-1">
                                    {interests.map((interest) => (
                                        <span key={interest.id} className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-700">{interest.name}</span>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}
                </div>

                {/* Right Content */}
                <div className="w-2/3 p-6 flex flex-col gap-4">
                    {/* Profile/Summary */}
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
                            <div className="flex flex-col gap-3">
                                {projects.map((proj: Project) => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-xs font-bold text-gray-800">{proj.name}</h3>
                                            <span className="text-xs text-gray-500">
                                                {proj.startDate}{proj.startDate && proj.endDate && ' - '}{proj.endDate}
                                            </span>
                                        </div>
                                        {proj.description && (
                                            <p className="text-xs text-gray-700">{proj.description}</p>
                                        )}
                                        {proj.technologies && proj.technologies.length > 0 && (
                                            <p className="text-xs text-blue-600 mt-0.5">{proj.technologies.join(' | ')}</p>
                                        )}
                                        {proj.highlights && proj.highlights.length > 0 && (
                                            <ul className="text-xs text-gray-700 list-disc list-inside mt-1">
                                                {proj.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                            </ul>
                                        )}
                                        {proj.links && proj.links.length > 0 && (
                                            <div className="flex flex-col gap-1 text-xs mt-1">
                                                {proj.links.map((link, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <span className="font-medium text-gray-600">{link.label}:</span>
                                                        {link.liveUrl && (
                                                            <a href={link.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                                                                <ExternalLink size={10} />
                                                                Live
                                                            </a>
                                                        )}
                                                        {link.liveUrl && link.githubUrl && (
                                                            <span className="text-gray-400">|</span>
                                                        )}
                                                        {link.githubUrl && (
                                                            <a href={link.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline flex items-center gap-1">
                                                                <Github size={10} />
                                                                GitHub
                                                            </a>
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
                </div>
            </div>
        </div>
    );
};

export default ModernSplitTheme;
