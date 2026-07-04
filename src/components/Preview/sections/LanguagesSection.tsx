import React from 'react';
import type { Language } from '../../../types/resume';
import type { ThemeTokens } from '../Themes/themeTokens';
import { sectionHeaderStyle } from '../Themes/themeTokens';
import { sectionHeaderClass } from '../../../styles/documentTypography';

interface LanguagesSectionProps {
  languages: Language[];
  label: string;
  tokens: ThemeTokens;
  visible: boolean;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages, label, tokens, visible }) => {
  if (!visible || languages.length === 0) return null;

  return (
    <section className={`${tokens.sectionGap} break-inside-avoid`}>
      <h3 className={sectionHeaderClass(tokens.typography, tokens.sectionHeaderSpacing)} style={sectionHeaderStyle(tokens)}>
        {label}
      </h3>
      <div className="flex flex-col gap-1">
        {languages.map((lang) => (
          <div key={lang.id} className="flex justify-between">
            <span className={`${tokens.typography.body} font-semibold text-gray-800`}>{lang.name}</span>
            <span className={`${tokens.typography.meta} text-gray-500`}>{lang.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LanguagesSection;
