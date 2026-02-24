import React from 'react';
import { useResume } from '../../../store/ResumeContext';
import type { SkillCategory, Education, Experience, Project, Language } from '../../../types/resume';
import { Mail, Phone, MapPin, Link as LinkIcon, Linkedin, Github, MessageSquare } from 'lucide-react';

const ModernSplitTheme: React.FC = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, languages, interests, interestsFormat, interestsParagraph, sectionLabels } = resumeData;

    const getHostname = (url: string) => {
        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '');
        } catch {
            return url;
        }
    };

    return (
        <div className="w-[210mm] min-h-[297mm] mx-auto bg-white text-gray-800 font-sans box-border flex flex-row shadow-2xl">

            {/* Left Sidebar - Light Gray Background */}
            <div className="w-1/3 min-h-[297mm] bg-[#f8f9fa] p-8 lg:px-10 lg:py-8 border-r border-gray-200">

                {/* Name and Title */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold uppercase tracking-tight text-[#547690] whitespace-pre-wrap leading-tight mb-4" style={{ wordBreak: 'keep-all' }}>
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <div className="flex flex-col gap-2">
                        {personalInfo.dateOfBirth && (
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs font-semibold text-gray-800 w-24 shrink-0 uppercase tracking-wide">Date of birth:</span>
                                <span className="text-sm font-normal text-gray-700">{personalInfo.dateOfBirth}</span>
                            </div>
                        )}
                        {personalInfo.nationality && (
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs font-semibold text-gray-800 w-24 shrink-0 uppercase tracking-wide">Nationality:</span>
                                <span className="text-sm font-normal text-gray-700">{personalInfo.nationality}</span>
                            </div>
                        )}
                        {personalInfo.gender && (
                            <div className="flex items-baseline gap-2">
                                <span className="text-xs font-semibold text-gray-800 w-24 shrink-0 uppercase tracking-wide">Gender:</span>
                                <span className="text-sm font-normal text-gray-700">{personalInfo.gender}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#547690] mb-4 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>{sectionLabels.contact}</h2>
                    <div className="flex flex-col gap-3 text-sm font-normal text-gray-700">
                        {personalInfo.address && (
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-blue-700 mt-0.5 shrink-0" />
                                <span className="leading-snug">{personalInfo.address}</span>
                            </div>
                        )}
                        {personalInfo.email && (
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-blue-700 shrink-0" />
                                <a href={`mailto:${personalInfo.email}`} className="text-blue-700 hover:underline">
                                    {personalInfo.email}
                                </a>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-blue-700 shrink-0" />
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.linkedinUrl && (
                            <div className="flex items-center gap-3">
                                <Linkedin size={16} className="text-blue-700 shrink-0" />
                                <a href={personalInfo.linkedinUrl} className="text-blue-700 hover:underline">
                                    {getHostname(personalInfo.linkedinUrl)}
                                </a>
                            </div>
                        )}
                        {personalInfo.githubUrl && (
                            <div className="flex items-center gap-3">
                                <Github size={16} className="text-blue-700 shrink-0" />
                                <a href={personalInfo.githubUrl} className="text-blue-700 hover:underline">
                                    {getHostname(personalInfo.githubUrl)} (Github)
                                </a>
                            </div>
                        )}
                        {personalInfo.whatsapp && (
                            <div className="flex items-center gap-3">
                                <MessageSquare size={16} className="text-blue-700 shrink-0" />
                                <span>{personalInfo.whatsapp} (WhatsApp)</span>
                            </div>
                        )}
                        {personalInfo.portfolioUrl && (
                            <div className="flex items-center gap-3">
                                <LinkIcon size={16} className="text-blue-700 shrink-0" />
                                <a href={personalInfo.portfolioUrl} className="text-blue-700 hover:underline">
                                    {getHostname(personalInfo.portfolioUrl)} (Portfolio)
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Summary */}
                {personalInfo.summary && (
                    <div className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[#547690] mb-4 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>{sectionLabels.profile}</h2>
                        <div className="text-sm font-normal text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {personalInfo.summary}
                        </div>
                    </div>
                )}

                {/* Languages Section */}
                {languages.length > 0 && (
                    <div className="mb-6 mt-2">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[#547690] mb-4 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                            {sectionLabels.languages}
                        </h2>
                        <div className="flex flex-col gap-3">
                            {languages.map((lang: Language) => (
                                <div key={lang.id} className="flex justify-between items-baseline gap-2">
                                    <span className="text-sm font-semibold text-gray-800">{lang.name}</span>
                                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide whitespace-nowrap">{lang.level}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interests Section */}
                {interestsFormat === 'paragraph' ? (
                    interestsParagraph.trim() && (
                        <div className="mb-6 mt-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-[#547690] mb-4 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                                {sectionLabels.interests}
                            </h2>
                            <div className="text-sm font-normal text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {interestsParagraph}
                            </div>
                        </div>
                    )
                ) : (
                    interests && interests.length > 0 && (
                        <div className="mb-6 mt-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-[#547690] mb-4 pb-1" style={{ borderBottom: '1px solid #e2e8f0' }}>
                                {sectionLabels.interests}
                            </h2>
                            <div className="flex flex-col gap-2">
                                {interests.map((interest: any) => (
                                    <div key={interest.id} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-700/50"></div>
                                        <span className="text-sm font-medium text-gray-700">{interest.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* Right Main Content */}
            <div className="w-2/3 p-8 lg:p-10 flex flex-col gap-6">

                {/* Skills */}
                {skills.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[#547690] mb-4 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                            {sectionLabels.skills}
                        </h2>
                        <div className="flex flex-col gap-3">
                            {skills.map((skillCat: SkillCategory) => (
                                <div key={skillCat.id}>
                                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 block mb-0.5">{skillCat.category}</span>
                                    <span className="text-sm font-normal text-gray-700">{skillCat.skills.join(' | ')}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* generic Timeline Component Helper */}
                {(() => {
                    const TimelineItem = ({
                        leftText,
                        rightText,
                        title,
                        subtitle,
                        description,
                        bullets,
                        link
                    }: any) => (
                        <div className="relative pl-6 pb-6 last:pb-0 border-l-[2px] border-blue-700/20 ml-[5px]">
                            {/* Timeline Dot */}
                            <div className="absolute w-2.5 h-2.5 bg-blue-700 rounded-full top-1.5" style={{ left: '-1px', transform: 'translateX(-50%)' }}></div>

                            {/* Header Row */}
                            {(leftText || rightText) && (
                                <div className="flex justify-start gap-2 items-baseline mb-1">
                                    {leftText && <span className="text-sm font-medium text-blue-700">{leftText}</span>}
                                    {rightText && <span className="text-sm font-medium text-gray-500">{rightText}</span>}
                                </div>
                            )}

                            {/* Title & Subtitle */}
                            <div className="mb-1.5">
                                <span className="text-base font-bold text-gray-800 mr-2">{title}</span>
                                {subtitle && <span className="text-sm font-medium text-gray-800">{subtitle}</span>}
                            </div>

                            {/* Body Content */}
                            {description && <div className="text-sm font-normal text-gray-700 leading-relaxed mb-1.5">{description}</div>}

                            {bullets && bullets.length > 0 && (
                                <ul className="text-sm font-normal text-gray-700 list-disc list-inside space-y-1 ml-2">
                                    {bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                                </ul>
                            )}

                            {link && (
                                <div className="text-sm mt-1.5">
                                    <span className="font-semibold text-gray-800">Link: </span>
                                    <a href={link} className="text-blue-700 hover:underline underline-offset-2">{link}</a>
                                </div>
                            )}
                        </div>
                    );

                    return (
                        <>
                            {/* Education Section */}
                            {education.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#547690] mb-4 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        {sectionLabels.education}
                                    </h2>
                                    <div className="flex flex-col">
                                        {education.map((edu: Education) => (
                                            <TimelineItem
                                                key={edu.id}
                                                leftText={`${edu.startDate} – ${edu.endDate}`}
                                                title={edu.degree}
                                                subtitle={edu.institution}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Experience Section */}
                            {experience.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#547690] mb-4 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        {sectionLabels.experience}
                                    </h2>
                                    <div className="flex flex-col">
                                        {experience.map((exp: Experience) => (
                                            <TimelineItem
                                                key={exp.id}
                                                title={exp.company}
                                                description={
                                                    <div className="mt-1 flex flex-col gap-1.5">
                                                        <div className="text-sm font-medium text-gray-800">{exp.position}</div>
                                                        <div className="text-sm font-medium text-blue-700">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>

                                                        {exp.description && <div className="whitespace-pre-wrap text-sm font-normal text-gray-700 mt-1">{exp.description}</div>}

                                                        {exp.experienceProjects && exp.experienceProjects.length > 0 && (
                                                            <div className="mt-2">
                                                                <div className="text-xs font-semibold uppercase tracking-wide text-gray-800 mb-2">Projects Contributed To</div>
                                                                <div className="flex flex-col gap-3">
                                                                    {exp.experienceProjects.map(proj => (
                                                                        <div key={proj.id}>
                                                                            <div className="text-sm font-bold text-gray-800 mb-1">{proj.name}</div>
                                                                            {proj.format === 'paragraph' && proj.description && (
                                                                                <div className="text-sm font-normal text-gray-700 whitespace-pre-wrap leading-relaxed">{proj.description}</div>
                                                                            )}
                                                                            {proj.format === 'bullets' && proj.bullets.length > 0 && (
                                                                                <ul className="text-sm font-normal text-gray-700 list-disc list-inside space-y-1 ml-1 leading-relaxed">
                                                                                    {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
                                                                                </ul>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                }
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Projects Section */}
                            {projects.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#547690] mb-4 pb-1" style={{ borderBottom: '1px solid #e5e7eb' }}>
                                        {sectionLabels.projects}
                                    </h2>
                                    <div className="flex flex-col">
                                        {projects.map((proj: Project) => (
                                            <TimelineItem
                                                key={proj.id}
                                                leftText={proj.startDate && proj.endDate ? `${proj.startDate} – ${proj.endDate}` : ''}
                                                title={proj.name}
                                                description={
                                                    <div className="space-y-1">
                                                        <div className="text-sm font-normal text-gray-700"><span className="font-semibold text-gray-800">Project Description:</span> {proj.description}</div>
                                                        {proj.technologies.length > 0 && <div className="text-sm font-normal text-gray-700"><span className="font-semibold text-gray-800">Technologies Used:</span> {proj.technologies.join(', ')}</div>}
                                                        {proj.highlights.length > 0 && <div className="text-xs font-semibold uppercase tracking-wide text-gray-800 pt-1">Contributions:</div>}
                                                    </div>
                                                }
                                                bullets={proj.highlights}
                                                link={proj.link}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    );
                })()}

            </div>
        </div>
    );
};

export default ModernSplitTheme;
