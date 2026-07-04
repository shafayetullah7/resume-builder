import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { Experience } from '../../../types/resume';
import type { ThemeTokens } from '../Themes/themeTokens';
import { sectionHeaderStyle } from '../Themes/themeTokens';
import { sectionHeaderClass } from '../../../styles/documentTypography';
import { formatDateRange, getHostname } from '../../../utils/resumeFormatUtils';

interface ExperienceSectionProps {
  experience: Experience[];
  label: string;
  tokens: ThemeTokens;
  visible: boolean;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience, label, tokens, visible }) => {
  if (!visible || experience.length === 0) return null;

  return (
    <section className={`${tokens.sectionGap} break-inside-avoid`}>
      <h3 className={sectionHeaderClass(tokens.typography, tokens.sectionHeaderSpacing)} style={sectionHeaderStyle(tokens)}>
        {label}
      </h3>
      <div className={`flex flex-col ${tokens.blockGap}`}>
        {experience.map((exp) => (
          <div key={exp.id} className={`${tokens.entryGap} break-inside-avoid`}>
            <div className="flex justify-between items-baseline">
              <h4 className={`${tokens.typography.body} font-semibold text-gray-800`}>{exp.position}</h4>
              <span className={`${tokens.typography.meta} text-gray-500`}>
                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
              </span>
            </div>
            <p className={`${tokens.typography.meta} font-semibold`} style={{ color: tokens.accent }}>
              {exp.company}
              {exp.location && <span className="text-gray-600 font-normal"> · {exp.location}</span>}
            </p>
            {exp.format === 'paragraph' && exp.description && (
              <p className={`${tokens.typography.body} text-gray-700 mt-1 whitespace-pre-wrap leading-snug`}>{exp.description}</p>
            )}
            {exp.format === 'bullets' && exp.bullets && exp.bullets.length > 0 && (
              <ul className={`${tokens.typography.body} text-gray-700 list-disc list-outside ml-4 mt-1 leading-snug`}>
                {exp.bullets.map((b, i) => b && <li key={i}>{b}</li>)}
              </ul>
            )}
            {exp.experienceProjects && exp.experienceProjects.length > 0 && (
              <div className="mt-2 ml-2 border-l border-gray-300 pl-2">
                {exp.experienceProjects.map((proj) => (
                  <div key={proj.id} className="mb-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`${tokens.typography.meta} font-semibold text-gray-800`}>{proj.name}</span>
                      {proj.liveLink && (
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${tokens.typography.meta} hover:underline flex items-center gap-1 shrink-0`}
                          style={{ color: tokens.accent }}
                        >
                          <ExternalLink size={9} className="print:hidden" />
                          {getHostname(proj.liveLink)}
                        </a>
                      )}
                    </div>
                    {proj.projectDescription && (
                      <div className={`${tokens.typography.meta} text-gray-500 italic mb-1`}>{proj.projectDescription}</div>
                    )}
                    {proj.format === 'paragraph' && proj.description && (
                      <p className={`${tokens.typography.body} text-gray-700 mt-1 whitespace-pre-wrap leading-snug`}>{proj.description}</p>
                    )}
                    {proj.format === 'bullets' && proj.bullets && proj.bullets.length > 0 && (
                      <ul className={`${tokens.typography.body} text-gray-700 list-disc list-outside ml-4 mt-1 leading-snug`}>
                        {proj.bullets.map((b, i) => b && <li key={i}>{b}</li>)}
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
  );
};

export default ExperienceSection;
