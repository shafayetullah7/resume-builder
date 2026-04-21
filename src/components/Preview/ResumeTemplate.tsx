import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Award, ExternalLink, Globe, MessageCircle } from 'lucide-react';

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

    const accent = '#2D4A6B';
    const linkStyle = `hover:underline text-[10pt]`;
    const linkColorStyle = { color: accent };

    return (
        <div className="w-full h-full bg-white text-gray-800 p-6 md:p-8 box-border text-[11pt] leading-relaxed" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
            <header className="mb-5 pb-3" style={{ borderBottom: `2px solid ${accent}` }}>
                <h1 className="text-[20pt] font-extrabold uppercase tracking-wide text-gray-900 leading-tight">
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <h2 className="text-[11pt] font-semibold" style={{ color: accent }}>
                    {personalInfo.jobTitle || 'Your Job Title'}
                </h2>

                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-gray-600 text-[10pt]">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <Mail size={10} style={{ color: accent }} />
                            <a href={`mailto:${personalInfo.email}`} className={linkStyle} style={linkColorStyle}>{personalInfo.email}</a>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <Phone size={10} style={{ color: accent }} />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.whatsapp && (
                        <div className="flex items-center gap-1">
                            <MessageCircle size={10} style={{ color: accent }} />
                            <span>{personalInfo.whatsapp}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className="flex items-center gap-1">
                            <MapPin size={10} style={{ color: accent }} />
                            <span>{personalInfo.address}</span>
                        </div>
                    )}
                    {personalInfo.portfolioUrl && (
                        <div className="flex items-center gap-1">
                            <Globe size={10} style={{ color: accent }} />
                            <a href={personalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer" className={linkStyle} style={linkColorStyle}>
                                {getHostname(personalInfo.portfolioUrl)}
                            </a>
                        </div>
                    )}
                    {personalInfo.linkedinUrl && (
                        <div className="flex items-center gap-1">
                            <Linkedin size={10} style={{ color: accent }} />
                            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkStyle} style={linkColorStyle}>
                                {getHostname(personalInfo.linkedinUrl)}
                            </a>
                        </div>
                    )}
                    {personalInfo.githubUrl && (
                        <div className="flex items-center gap-1">
                            <Github size={10} style={{ color: accent }} />
                            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className={linkStyle} style={linkColorStyle}>
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
                <section className="mb-4 break-inside-avoid">
                    <h3 className="text-[10pt] font-bold uppercase tracking-wider pb-1 mb-2 flex items-center gap-2" style={{ color: accent, borderBottom: `1px solid ${accent}30` }}>
                        {sectionLabels.profile}
                    </h3>
                    <p className="text-gray-700 text-[10pt] leading-relaxed whitespace-pre-wrap">
                        {personalInfo.summary}
                    </p>
                </section>
            )}

            <div className="flex flex-row gap-5">
                {/* Left Sidebar - Narrow - Skills, Education, Languages, Certifications, Interests */}
                <div className="w-[30%] flex flex-col gap-3">
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: accent, borderBottom: `1px solid ${accent}30` }}>
                                {sectionLabels.skills}
                            </h3>
                            <div className="flex flex-col gap-2">
                                {skills.map((skillCat) => (
                                    <div key={skillCat.id} className="break-inside-avoid">
                                        <span className="text-[10pt] font-semibold text-gray-800 block mb-1">{skillCat.category}</span>
                                        <div className="flex flex-wrap gap-1">
                                            {skillCat.skills.map((skill, index) => (
                                                <span key={index} className="text-[9pt] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
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
                        <section>
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: accent, borderBottom: `1px solid ${accent}30` }}>
                                {sectionLabels.education}
                            </h3>
                            <div className="flex flex-col gap-2">
                                {education.map((edu) => (
                                    <div key={edu.id} className="break-inside-avoid">
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
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: accent, borderBottom: `1px solid ${accent}30` }}>
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
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: accent, borderBottom: `1px solid ${accent}30` }}>
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
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: accent, borderBottom: `1px solid ${accent}30` }}>
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
                <div className="w-[70%] flex flex-col gap-3">
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section>
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: accent, borderBottom: `1px solid ${accent}30` }}>
                                {sectionLabels.experience}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {experience.map((exp) => (
                                    <div key={exp.id} className="break-inside-avoid mb-2">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="text-[10pt] font-semibold text-gray-800">{exp.position}</h4>
                                            <span className="text-[10pt] text-gray-500">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                                        </div>
                                        <p className="text-[10pt] font-semibold" style={{ color: accent }}>{exp.company}</p>
                                        {exp.description && (
                                            <p className="text-[10pt] text-gray-700 mt-1 whitespace-pre-wrap">{exp.description}</p>
                                        )}
                                        {exp.experienceProjects && exp.experienceProjects.length > 0 && (
                                            <div className="mt-2 ml-2 border-l border-gray-300 pl-2">
                                                {exp.experienceProjects.map((proj) => (
                                                    <div key={proj.id} className="mb-2">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="text-[10pt] font-semibold text-gray-800">{proj.name}</span>
                                                            {proj.liveLink && (
                                                                <a
                                                                    href={proj.liveLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[10pt] hover:underline flex items-center gap-1 shrink-0"
                                                                    style={{ color: accent }}
                                                                >
                                                                    <ExternalLink size={9} />
                                                                    Live
                                                                </a>
                                                            )}
                                                        </div>
                                                        {proj.projectDescription && (
                                                            <span className="text-[10pt] text-gray-500">{proj.projectDescription}</span>
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
                            <h3 className="text-[10pt] font-bold uppercase tracking-wider pb-1 mb-2" style={{ color: accent, borderBottom: `1px solid ${accent}30` }}>
                                {sectionLabels.projects}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {projects.map((proj) => (
                                    <div key={proj.id} className="break-inside-avoid">
                                        {/* Header: Name + Date */}
                                        <div className="flex justify-between items-baseline">
                                            <div>
                                                <span className="text-[10pt] font-semibold text-gray-800">{proj.name}</span>
                                                {proj.description && (
                                                    <span className="text-[10pt] text-gray-600"> - {proj.description}</span>
                                                )}
                                            </div>
                                            <span className="text-[10pt] text-gray-500">
                                                {formatDateRange(proj.startDate || '', proj.endDate || '', false)}
                                            </span>
                                        </div>

                                        {/* Technologies inline */}
                                        {proj.technologies && proj.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {proj.technologies.map((tech, idx) => (
                                                    <span key={idx} className="text-[9pt] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
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
