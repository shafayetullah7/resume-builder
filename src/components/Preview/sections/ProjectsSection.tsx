import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../../types/resume';
import type { ThemeTokens } from '../Themes/themeTokens';
import { sectionHeaderStyle } from '../Themes/themeTokens';
import { pillClass, sectionHeaderClass } from '../../../styles/documentTypography';
import { formatDateRange, getHostname } from '../../../utils/resumeFormatUtils';

interface ProjectsSectionProps {
  projects: Project[];
  label: string;
  tokens: ThemeTokens;
  visible: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, label, tokens, visible }) => {
  if (!visible || projects.length === 0) return null;

  const pillClassName = tokens.skillsStyle === 'pills' ? pillClass(tokens.typography) : '';

  return (
    <section className={`${tokens.sectionGap} break-inside-avoid`}>
      <h3 className={sectionHeaderClass(tokens.typography)} style={sectionHeaderStyle(tokens)}>
        {label}
      </h3>
      <div className="flex flex-col gap-3">
        {projects.map((proj) => (
          <div key={proj.id} className="break-inside-avoid">
            <div className="flex justify-between items-baseline">
              <span className={`${tokens.typography.body} font-semibold text-gray-800`}>{proj.name}</span>
              <span className={`${tokens.typography.meta} text-gray-500`}>
                {formatDateRange(proj.startDate || '', proj.endDate || '', false)}
              </span>
            </div>
            {proj.description && (
              <p className={`${tokens.typography.body} text-gray-700 mt-0.5 leading-snug`}>{proj.description}</p>
            )}
            {proj.technologies && proj.technologies.length > 0 && (
              tokens.skillsStyle === 'comma' ? (
                <p className={`${tokens.typography.meta} text-gray-600 mt-1 leading-snug`}>{proj.technologies.join(', ')}</p>
              ) : (
                <div className="flex flex-wrap gap-1 mt-1">
                  {proj.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={pillClassName}
                      style={{ backgroundColor: `${tokens.accent}15`, color: tokens.accent, borderColor: `${tokens.accent}30` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )
            )}
            {proj.highlights && proj.highlights.length > 0 && (
              <ul className={`${tokens.typography.body} text-gray-700 list-disc list-outside ml-4 mt-1 leading-snug`}>
                {proj.highlights.map((h, i) => h && <li key={i}>{h}</li>)}
              </ul>
            )}
            {proj.links && proj.links.length > 0 && (
              <div className={`flex flex-col gap-1 ${tokens.typography.meta} mt-1`}>
                {proj.links.map((link, i) => (
                  <div key={i} className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-600">{link.label}:</span>
                    {link.liveUrl && (
                      <a href={link.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1" style={{ color: tokens.accent }}>
                        <ExternalLink size={10} className="print:hidden" />
                        {getHostname(link.liveUrl)}
                      </a>
                    )}
                    {link.liveUrl && link.githubUrl && <span className="text-gray-400">|</span>}
                    {link.githubUrl && (
                      <a href={link.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1" style={{ color: tokens.accent }}>
                        <Github size={10} className="print:hidden" />
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
  );
};

export default ProjectsSection;
