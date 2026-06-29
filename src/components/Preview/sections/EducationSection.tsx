import React from 'react';
import type { Education } from '../../../types/resume';
import type { ThemeTokens } from '../Themes/themeTokens';
import { sectionHeaderClass, sectionHeaderStyle } from '../Themes/themeTokens';
import { formatDateRange } from '../../../utils/resumeFormatUtils';

interface EducationSectionProps {
  education: Education[];
  label: string;
  tokens: ThemeTokens;
  visible: boolean;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, label, tokens, visible }) => {
  if (!visible || education.length === 0) return null;

  return (
    <section className={`${tokens.sectionGap} break-inside-avoid`}>
      <h3 className={sectionHeaderClass(tokens)} style={sectionHeaderStyle(tokens)}>
        {label}
      </h3>
      <div className="flex flex-col gap-2">
        {education.map((edu) => (
          <div key={edu.id} className="break-inside-avoid">
            <span className={`${tokens.bodySize} font-semibold text-gray-800 block`}>{edu.degree}</span>
            <span className={`${tokens.metaSize} text-gray-600`}>{edu.institution}</span>
            <span className={`${tokens.metaSize} text-gray-500 block`}>
              {formatDateRange(edu.startDate, edu.endDate, false)}
            </span>
            {edu.description && (
              <p className={`${tokens.metaSize} text-gray-600 mt-0.5 leading-snug`}>{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
