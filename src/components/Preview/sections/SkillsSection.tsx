import React from 'react';
import type { SkillCategory } from '../../../types/resume';
import type { ThemeTokens } from '../Themes/themeTokens';
import { sectionHeaderStyle } from '../Themes/themeTokens';
import { pillClass, sectionHeaderClass } from '../../../styles/documentTypography';

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
      <h3 className={sectionHeaderClass(tokens.typography, tokens.sectionHeaderSpacing)} style={sectionHeaderStyle(tokens)}>
        {label}
      </h3>
      <div className={`flex flex-col ${tokens.itemGap}`}>
        {skills.map((skillCat) => (
          <div key={skillCat.id} className="break-inside-avoid">
            <span className={`${tokens.typography.body} font-semibold text-gray-800 block mb-0.5`}>{skillCat.category}</span>
            {tokens.skillsStyle === 'comma' ? (
              <p className={`${tokens.typography.meta} text-gray-700 leading-snug`}>{skillCat.skills.join(', ')}</p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {skillCat.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={pillClass(tokens.typography)}
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
