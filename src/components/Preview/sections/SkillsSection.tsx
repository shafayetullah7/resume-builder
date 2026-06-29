import React from 'react';
import type { SkillCategory } from '../../../types/resume';
import type { ThemeTokens } from '../Themes/themeTokens';
import { sectionHeaderStyle } from '../Themes/themeTokens';
import { resumePillClass, resumeSectionHeaderClass, resumeText } from '../../../styles/documentTypography';

interface SkillsSectionProps {
  skills: SkillCategory[];
  label: string;
  tokens: ThemeTokens;
  visible: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, label, tokens, visible }) => {
  if (!visible || skills.length === 0) return null;

  return (
    <section className={`${tokens.sectionGap} break-inside-avoid`}>
      <h3 className={resumeSectionHeaderClass} style={sectionHeaderStyle(tokens)}>
        {label}
      </h3>
      <div className="flex flex-col gap-2">
        {skills.map((skillCat) => (
          <div key={skillCat.id} className="break-inside-avoid">
            <span className={`${resumeText.body} font-semibold text-gray-800 block mb-0.5`}>{skillCat.category}</span>
            {tokens.skillsStyle === 'comma' ? (
              <p className={`${resumeText.meta} text-gray-700 leading-snug`}>{skillCat.skills.join(', ')}</p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {skillCat.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={resumePillClass}
                    style={{ backgroundColor: `${tokens.accent}15`, color: tokens.accent, borderColor: `${tokens.accent}30` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
