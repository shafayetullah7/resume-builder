import React from 'react';
import { useResume } from '../../../store/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Award, ExternalLink } from 'lucide-react';
import type { Project, Experience, ExperienceProject } from '../../../types/resume';

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

    const getHostname = (url: string) => {
        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            return urlObj.hostname.replace('www.', '') + (urlObj.pathname !== '/' ? urlObj.pathname : '');
        } catch {
            return url;
        }
    };

    return (
        <div className="w-full min-h-full bg-white text-gray-800 box-border" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
            <div className="flex min-h-full">
                {/* Left Sidebar */}
                <div className="w-1/3 bg-[#eef1f4] p-6 flex flex-col gap-4 border-r border-gray-300">
                    {/* Contact Info */}
                    <div className="border-b border-gray-300 pb-4">
                        <h1 className="text-2xl font-black text-[#547690] uppercase tracking-wide mb-1 leading-tight">
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <p className="text-[11px] text-gray-600 font-semibold mb-3 uppercase tracking-wider">
                            {personalInfo.jobTitle || 'Your Job Title'}
                        </p>

                        <div className="flex flex-col gap-1.5 text-[10px] text-gray-700">
                            {personalInfo.email && (
                                <div className="flex items-center gap-2">
                                    <Mail size={10} className="text-[#547690]" />
                                    <a href={`mailto:${personalInfo.email}`} className="hover:text-[#547690]">{personalInfo.email}</a>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={10} className="text-[#547690]" />
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo.address && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={10} className="text-[#547690]" />
                                    <span>{personalInfo.address}</span>
                                </div>
                            )}
                            {personalInfo.linkedinUrl && (
                                <div className="flex items-center gap-2">
                                    <Linkedin size={10} className="text-[#547690]" />
                                    <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#547690]">
                                        {getHostname(personalInfo.linkedinUrl)}
                                    </a>
                                </div>
                            )}
                            {personalInfo.githubUrl && (
                                <div className="flex items-center gap-2">
                                    <Github size={10} className="text-[#547690]" />
                                    <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#547690]">
                                        {getHostname(personalInfo.githubUrl)}
                                    </a>
                                </div>
                            )}
                            {personalInfo.portfolioUrl && (
                                <div className="flex items-center gap-2">
                                    <ExternalLink size={10} className="text-[#547690]" />
                                    <a href={personalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#547690]">
                                        {getHostname(personalInfo.portfolioUrl)}
                                    </a>
                                </div>
                            )}
                            {personalInfo.whatsapp && (
                                <div className="flex items-center gap-2">
                                    <Phone size={10} className="text-[#547690]" />
                                    <a href={`https://wa.me/${personalInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#547690]">WhatsApp</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <section className="break-inside-avoid mb-4">
                            <h2 className="text-[9px] font-bold uppercase tracking-wider text-[#547690] mb-2 pb-1 border-b border-gray-200">
                                {sectionLabels.skills}
                            </h2>
                            <div className="flex flex-col gap-3">
                                {skills.map((skillCat) => (
                                    <div key={skillCat.id}>
                                        <span className="text-[10px] font-semibold text-gray-800 block mb-1.5">{skillCat.category}</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {skillCat.skills.map((skill, idx) => (
                                                <span key={idx} className="bg-[#547690]/10 text-[#547690] px-2 py-0.5 rounded text-[10px] font-medium border border-[#547690]/20">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="break-inside-avoid mb-4">
                            <h2 className="text-[9px] font-bold uppercase tracking-wider text-[#547690] mb-2 pb-1 border-b border-gray-200">
                                {sectionLabels.education}
                            </h2>
                            <div className="flex flex-col gap-2">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <span className="text-[10px] font-semibold text-gray-800 block">{edu.degree}</span>
                                        <span className="text-[10px] text-gray-600">{edu.institution}</span>
                                        <span className="text-[10px] text-gray-500 block">{formatDateRange(edu.startDate, edu.endDate, false)}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <section className="break-inside-avoid mb-4">
                            <h2 className="text-[9px] font-bold uppercase tracking-wider text-[#547690] mb-2 pb-1 border-b border-gray-200">
                                {sectionLabels.certifications}
                            </h2>
                            <div className="flex flex-col gap-2">
                                {certifications.map((cert) => (
                                    <div key={cert.id}>
                                        <div className="flex items-center gap-1">
                                            <Award size={10} className="text-[#547690]" />
                                            <span className="text-[10px] font-semibold text-gray-800">{cert.name}</span>
                                        </div>
                                        <span className="text-[10px] text-gray-500 ml-4">{cert.issuer} ({formatDate(cert.date)})</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <section className="break-inside-avoid mb-4">
                            <h2 className="text-[9px] font-bold uppercase tracking-wider text-[#547690] mb-2 pb-1 border-b border-gray-200">
                                {sectionLabels.languages}
                            </h2>
                            <div className="flex flex-col gap-1">
                                {languages.map((lang) => (
                                    <div key={lang.id} className="flex justify-between">
                                        <span className="text-[10px] font-semibold text-gray-800">{lang.name}</span>
                                        <span className="text-[10px] text-gray-500">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests */}
                    {interests.length > 0 && (
                        <section className="break-inside-avoid mb-4">
                            <h2 className="text-[9px] font-bold uppercase tracking-wider text-[#547690] mb-2 pb-1 border-b border-gray-200">
                                {sectionLabels.interests}
                            </h2>
                            {interestsFormat === 'paragraph' && interestsParagraph ? (
                                <p className="text-xs text-gray-600">{interestsParagraph}</p>
                            ) : (
                                <div className="flex flex-wrap gap-1">
                                    {interests.map((interest) => (
                                        <span key={interest.id} className="text-[10px] bg-[#547690]/10 text-[#547690] px-2 py-0.5 rounded border border-[#547690]/20 font-medium">{interest.name}</span>
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
                        <section className="break-inside-avoid mb-4">
                            <h2 className="text-[9px] font-bold uppercase tracking-wider text-[#547690] mb-2 pb-1 border-b border-gray-200">
                                {sectionLabels.profile}
                            </h2>
                            <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="break-inside-avoid mb-4">
                            <h2 className="text-[9px] font-bold uppercase tracking-wider text-[#547690] mb-2 pb-1 border-b border-gray-200">
                                {sectionLabels.experience}
                            </h2>
                            <div className="flex flex-col gap-3">
                                {experience.map((exp: Experience) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-[11px] font-bold text-gray-800">{exp.position}</h3>
                                            <span className="text-[10px] text-gray-500">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                                        </div>
                                        <p className="text-[10px] font-semibold text-[#547690]">{exp.company}</p>
                                        {exp.description && (
                                            <p className="text-[11px] text-gray-700 mt-1 whitespace-pre-wrap">{exp.description}</p>
                                        )}
                                        {exp.experienceProjects && exp.experienceProjects.length > 0 && (
                                            <div className="mt-2 ml-2 border-l border-gray-300 pl-2">
                                                {exp.experienceProjects.map((proj: ExperienceProject) => (
                                                    <div key={proj.id} className="mb-2">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="text-[10px] font-semibold text-gray-800">{proj.name}</span>
                                                            {proj.liveLink && (
                                                                <a
                                                                    href={proj.liveLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[#547690] hover:underline flex items-center gap-1 text-[10px] shrink-0"
                                                                >
                                                                    <ExternalLink size={10} />
                                                                    Live
                                                                </a>
                                                            )}
                                                        </div>
                                                        {proj.projectDescription && (
                                                            <p className="text-[11px] text-gray-600 mt-0.5">{proj.projectDescription}</p>
                                                        )}
                                                        {proj.format === 'bullets' && proj.bullets.length > 0 && (
                                                            <ul className="text-[11px] text-gray-700 list-disc list-inside mt-1">
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
                        <section className="break-inside-avoid mb-4">
                            <h2 className="text-[9px] font-bold uppercase tracking-wider text-[#547690] mb-2 pb-1 border-b border-gray-200">
                                {sectionLabels.projects}
                            </h2>
                            <div className="flex flex-col gap-3">
                                {projects.map((proj: Project) => (
                                    <div key={proj.id} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-[11px] font-bold text-gray-800">{proj.name}</h3>
                                            <span className="text-[10px] text-gray-500">
                                                {formatDateRange(proj.startDate || '', proj.endDate || '', false)}
                                            </span>
                                        </div>
                                        {proj.description && (
                                            <p className="text-[11px] text-gray-700 mt-0.5">{proj.description}</p>
                                        )}
                                        {proj.technologies && proj.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-1.5 mb-1">
                                                {proj.technologies.map((tech, idx) => (
                                                    <span key={idx} className="bg-[#547690]/10 text-[#547690] px-2 py-0.5 rounded text-[10px] font-medium border border-[#547690]/20">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {proj.highlights && proj.highlights.length > 0 && (
                                            <ul className="text-[11px] text-gray-700 list-disc list-inside mt-1">
                                                {proj.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                            </ul>
                                        )}
                                        {proj.links && proj.links.length > 0 && (
                                            <div className="flex flex-col gap-1 text-[10px] mt-1">
                                                {proj.links.map((link, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <span className="font-medium text-gray-600">{link.label}:</span>
                                                        {link.liveUrl && (
                                                            <a href={link.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#547690] hover:text-[#547690]/80 hover:underline flex items-center gap-1">
                                                                <ExternalLink size={10} />
                                                                Live
                                                            </a>
                                                        )}
                                                        {link.liveUrl && link.githubUrl && (
                                                            <span className="text-gray-400">|</span>
                                                        )}
                                                        {link.githubUrl && (
                                                            <a href={link.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#547690] hover:underline flex items-center gap-1">
                                                                <Github size={10} />
                                                                {getHostname(link.githubUrl)}
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
