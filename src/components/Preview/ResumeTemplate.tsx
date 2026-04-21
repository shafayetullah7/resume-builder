import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Award, ExternalLink } from 'lucide-react';

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

    const linkStyle = "text-gray-700 hover:text-gray-900 underline text-[10pt]";

    return (
        <div className="w-full h-full bg-white text-gray-800 p-6 md:p-8 font-sans box-border text-[11pt] leading-relaxed">
            <header className="mb-4 pb-3 border-b border-gray-300">
                <h1 className="text-[14pt] font-bold uppercase tracking-wide text-gray-900">
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <h2 className="text-[11pt] font-medium text-gray-600">
                    {personalInfo.jobTitle || 'Your Job Title'}
                </h2>

                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-gray-600 text-[10pt]">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <Mail size={10} className="text-gray-700" />
                            <a href={`mailto:${personalInfo.email}`} className={linkStyle}>{personalInfo.email}</a>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <Phone size={10} className="text-gray-700" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className="flex items-center gap-1">
                            <MapPin size={10} className="text-gray-700" />
                            <span>{personalInfo.address}</span>
                        </div>
                    )}
                    {personalInfo.linkedinUrl && (
                        <div className="flex items-center gap-1">
                            <Linkedin size={10} className="text-gray-700" />
                            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                                {getHostname(personalInfo.linkedinUrl)}
                            </a>
                        </div>
                    )}
                    {personalInfo.githubUrl && (
                        <div className="flex items-center gap-1">
                            <Github size={10} className="text-gray-700" />
                            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className={linkStyle}>
                                {getHostname(personalInfo.githubUrl)}
                            </a>
                        </div>
                    )}
                </div>

                {(personalInfo.dateOfBirth || personalInfo.nationality || personalInfo.gender) && (
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-gray-500 text-[10pt]">
                        {personalInfo.dateOfBirth && <span>DOB: {personalInfo.dateOfBirth}</span>}
                        {personalInfo.nationality && <span>Nationality: {personalInfo.nationality}</span>}
                        {personalInfo.gender && <span>Gender: {personalInfo.gender}</span>}
                    </div>
                )}
            </header>

            {personalInfo.summary && (
                <section className="mb-4">
                    <p className="text-gray-700 text-[10pt] leading-relaxed">
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            <div className="flex flex-row gap-4">
                {/* Left Sidebar - Narrow - Skills, Education, Languages, Certifications, Interests */}
                <div className="w-1/4 flex flex-col gap-3">
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2">
                                {sectionLabels.skills}
                            </h3>
                            <div className="flex flex-col gap-2">
                                {skills.map((skillCat) => (
                                    <div key={skillCat.id}>
                                        <span className="text-[10pt] font-semibold text-gray-800 block">{skillCat.category}</span>
                                        <span className="text-[10pt] text-gray-600">{skillCat.skills.join(', ')}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2">
                                {sectionLabels.education}
                            </h3>
                            <div className="flex flex-col gap-2">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <span className="text-[10pt] font-semibold text-gray-800 block">{edu.degree}</span>
                                        <span className="text-[10pt] text-gray-600">{edu.institution}</span>
                                        <span className="text-[10pt] text-gray-500 block">{formatDateRange(edu.startDate, edu.endDate, false)}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <section>
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2">
                                {sectionLabels.certifications}
                            </h3>
                            <div className="flex flex-col gap-2">
                                {certifications.map((cert) => (
                                    <div key={cert.id}>
                                        <div className="flex items-center gap-1">
                                            <Award size={10} className="text-gray-700" />
                                            <span className="text-[10pt] font-semibold text-gray-800">{cert.name}</span>
                                        </div>
                                        <span className="text-[10pt] text-gray-500 ml-4">{cert.issuer} ({formatDate(cert.date)})</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <section>
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2">
                                {sectionLabels.languages}
                            </h3>
                            <div className="flex flex-col gap-1">
                                {languages.map((lang) => (
                                    <div key={lang.id} className="flex justify-between">
                                        <span className="text-[10pt] font-semibold text-gray-800">{lang.name}</span>
                                        <span className="text-[10pt] text-gray-500">{lang.level}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Interests */}
                    {interests.length > 0 && (
                        <section>
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider text-gray-800 border-b border-gray-300 pb-1 mb-2">
                                {sectionLabels.interests}
                            </h3>
                            {interestsFormat === 'paragraph' && interestsParagraph ? (
                                <p className="text-[10pt] text-gray-600">{interestsParagraph}</p>
                            ) : (
                                <div className="flex flex-wrap gap-1">
                                    {interests.map((interest) => (
                                        <span key={interest.id} className="text-[10pt] bg-gray-100 px-2 py-0.5 rounded text-gray-600">{interest.name}</span>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}
                </div>

                {/* Right Side - Main Content - Experience, Projects */}
                <div className="w-3/4 flex flex-col gap-3">
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section>
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2">
                                {sectionLabels.experience}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="text-[10pt] font-semibold text-gray-800">{exp.position}</h4>
                                            <span className="text-[10pt] text-gray-500">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                                        </div>
                                        <p className="text-[10pt] font-medium text-gray-800">{exp.company}</p>
                                        {exp.description && (
                                            <p className="text-[10pt] text-gray-700 mt-1 whitespace-pre-wrap">{exp.description}</p>
                                        )}
                                        {exp.experienceProjects && exp.experienceProjects.length > 0 && (
                                            <div className="mt-2 ml-2 border-l border-gray-300 pl-2">
                                                {exp.experienceProjects.map((proj) => (
                                                    <div key={proj.id} className="mb-2">
                                                        <span className="text-[10pt] font-semibold text-gray-800">{proj.name}</span>
                                                        {proj.projectDescription && (
                                                            <span className="text-[10pt] text-gray-500"> - {proj.projectDescription}</span>
                                                        )}
                                                        {proj.format === 'bullets' && proj.bullets.length > 0 && (
                                                            <ul className="text-[10pt] text-gray-700 list-disc list-inside mt-1">
                                                                {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
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
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-2">
                                {sectionLabels.projects}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {projects.map((proj) => (
                                    <div key={proj.id}>
                                        {/* Header: Name + Date */}
                                        <div className="flex justify-between items-baseline">
                                            <div>
                                                <span className="text-[10pt] font-semibold text-gray-800">{proj.name}</span>
                                                {proj.description && (
                                                    <span className="text-[10pt] text-gray-600"> - {proj.description}</span>
                                                )}
                                            </div>
                                            <span className="text-[10pt] text-gray-500">
                                                {proj.startDate}{proj.startDate && proj.endDate && ' - '}{proj.endDate}
                                            </span>
                                        </div>

                                        {/* Technologies inline */}
                                        {proj.technologies && proj.technologies.length > 0 && (
                                            <p className="text-[10pt] text-gray-700 mt-0.5">{proj.technologies.join(' | ')}</p>
                                        )}

                                        {/* Highlights */}
                                        {proj.highlights && proj.highlights.length > 0 && (
                                            <ul className="text-[10pt] text-gray-700 list-disc list-inside mt-1">
                                                {proj.highlights.map((h, i) => <li key={i}>{h}</li>)}
                                            </ul>
                                        )}

                                        {/* Links */}
                                        {proj.links && proj.links.length > 0 && (
                                            <div className="flex flex-col gap-1 text-[10pt] mt-1">
                                                {proj.links.map((link, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <span className="font-medium text-gray-600">{link.label}:</span>
                                                        {link.liveUrl && (
                                                            <a href={link.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
                                                                <ExternalLink size={12} />
                                                                Live
                                                            </a>
                                                        )}
                                                        {link.liveUrl && link.githubUrl && (
                                                            <span className="text-gray-400">|</span>
                                                        )}
                                                        {link.githubUrl && (
                                                            <a href={link.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline flex items-center gap-1">
                                                                <Github size={12} />
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

export default ResumeTemplate;
