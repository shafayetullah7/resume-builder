import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Award, ExternalLink } from 'lucide-react';

const ResumeTemplate: React.FC = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, languages, interests, certifications, sectionLabels, interestsFormat, interestsParagraph } = resumeData;

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

    const linkStyle = "text-blue-600 hover:text-blue-800 underline";

    return (
        <div className="w-full h-full bg-white text-gray-800 p-8 md:p-10 lg:p-12 font-sans box-border">
            <header className="mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-gray-900 mb-1">
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <h2 className="text-xl font-medium text-blue-700 mb-4">
                    {personalInfo.jobTitle || 'Your Job Title'}
                </h2>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} className="text-blue-600" />
                            <a href={`mailto:${personalInfo.email}`} className={linkStyle}>{personalInfo.email}</a>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={14} className="text-blue-600" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-blue-600" />
                            <span>{personalInfo.address}</span>
                        </div>
                    )}
                    {personalInfo.whatsapp && (
                        <div className="flex items-center gap-1.5">
                            <Globe size={14} className="text-blue-600" />
                            <span>WhatsApp: {personalInfo.whatsapp}</span>
                        </div>
                    )}
                    {personalInfo.portfolioUrl && (
                        <div className="flex items-center gap-1.5">
                            <Globe size={14} className="text-blue-600" />
                            <a href={personalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                                {getHostname(personalInfo.portfolioUrl)}
                            </a>
                        </div>
                    )}
                    {personalInfo.linkedinUrl && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin size={14} className="text-blue-600" />
                            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                                {getHostname(personalInfo.linkedinUrl)}
                            </a>
                        </div>
                    )}
                    {personalInfo.githubUrl && (
                        <div className="flex items-center gap-1.5">
                            <Github size={14} className="text-blue-600" />
                            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                                {getHostname(personalInfo.githubUrl)}
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {personalInfo.summary && (
                <section className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-1 mb-3">
                        {sectionLabels.profile}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700">
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            <div className="flex flex-col gap-5">

                {experience.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-1 mb-3">
                            {sectionLabels.experience}
                        </h3>
                        <div className="flex flex-col gap-4">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-gray-800">{exp.position}</h4>
                                        <span className="text-xs font-semibold text-gray-500">
                                            {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                                        </span>
                                    </div>
                                    <div className="text-sm font-medium text-blue-700 mb-2">
                                        {exp.company}
                                    </div>
                                    {exp.description && (
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {exp.description}
                                        </p>
                                    )}

                                    {exp.experienceProjects && exp.experienceProjects.length > 0 && (
                                        <div className="mt-3 ml-2">
                                            <h5 className="text-sm font-semibold text-gray-800 mb-2">Key Projects:</h5>
                                            <div className="flex flex-col gap-2 pl-3 border-l-2 border-blue-200">
                                                {exp.experienceProjects.map(proj => (
                                                    <div key={proj.id}>
                                                        <div className="text-sm font-bold text-gray-800">{proj.name}</div>
                                                        {proj.format === 'paragraph' && proj.description && (
                                                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                                {proj.description}
                                                            </p>
                                                        )}
                                                        {proj.format === 'bullets' && proj.bullets.length > 0 && (
                                                            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
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

                {education.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-1 mb-3">
                            {sectionLabels.education}
                        </h3>
                        <div className="flex flex-col gap-3">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                                        <span className="text-xs font-semibold text-gray-500">
                                            {formatDateRange(edu.startDate, edu.endDate, false)}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-700">
                                        {edu.institution}
                                    </div>
                                    {edu.description && (
                                        <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {certifications.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-1 mb-3">
                            {sectionLabels.certifications}
                        </h3>
                        <div className="flex flex-col gap-2">
                            {certifications.map((cert) => (
                                <div key={cert.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Award size={14} className="text-blue-600" />
                                        <div>
                                            <span className="font-medium text-gray-800">{cert.name}</span>
                                            <span className="text-gray-600"> — {cert.issuer}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>
                                        {cert.url && (
                                            <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink size={12} className="text-blue-600 hover:text-blue-800" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {projects.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-1 mb-3">
                            {sectionLabels.projects}
                        </h3>
                        <div className="flex flex-col gap-3">
                            {projects.map((proj) => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-gray-800">{proj.name}</h4>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                                                <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                                    {proj.technologies.length > 0 && (
                                        <p className="text-xs text-blue-600 mt-1">
                                            {proj.technologies.join(' • ')}
                                        </p>
                                    )}
                                    {proj.highlights.length > 0 && (
                                        <ul className="text-sm text-gray-700 list-disc list-inside mt-1 space-y-0.5">
                                            {proj.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-1 mb-3">
                            {sectionLabels.skills}
                        </h3>
                        <div className="flex flex-col gap-2">
                            {skills.map((skillCat) => (
                                <div key={skillCat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                    <h4 className="font-semibold text-gray-800 text-sm min-w-[140px]">
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

                {languages.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-1 mb-3">
                            {sectionLabels.languages}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {languages.map((lang) => (
                                <span key={lang.id} className="text-sm">
                                    <span className="font-medium text-gray-800">{lang.name}</span>
                                    <span className="text-gray-500"> — {lang.level}</span>
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {interests.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-1 mb-3">
                            {sectionLabels.interests}
                        </h3>
                        {interestsFormat === 'paragraph' && interestsParagraph ? (
                            <p className="text-sm text-gray-700">{interestsParagraph}</p>
                        ) : (
                            <p className="text-sm text-gray-700">
                                {interests.map(i => i.name).join(' • ')}
                            </p>
                        )}
                    </section>
                )}
            </div>
        </div>
    );
};

export default ResumeTemplate;
