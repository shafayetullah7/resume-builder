import React from 'react';
import type { Interest } from '../../../types/resume';
import type { ThemeTokens } from '../Themes/themeTokens';
import { sectionHeaderClass, sectionHeaderStyle } from '../Themes/themeTokens';

interface InterestsSectionProps {
  interests: Interest[];
  interestsFormat: 'bullets' | 'paragraph';
  interestsParagraph: string;
  label: string;
  tokens: ThemeTokens;
  visible: boolean;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({
  interests,
  interestsFormat,
  interestsParagraph,
  label,
  tokens,
  visible,
}) => {
  if (!visible) return null;
  if (interestsFormat === 'paragraph' && !interestsParagraph) return null;
  if (interestsFormat === 'bullets' && interests.length === 0) return null;

  return (
    <section className={`${tokens.sectionGap} break-inside-avoid`}>
      <h3 className={sectionHeaderClass(tokens)} style={sectionHeaderStyle(tokens)}>
        {label}
      </h3>
      {interestsFormat === 'paragraph' && interestsParagraph ? (
        <p className={`${tokens.metaSize} text-gray-600 leading-snug`}>{interestsParagraph}</p>
      ) : tokens.skillsStyle === 'pills' ? (
        <div className="flex flex-wrap gap-1">
          {interests.map((interest) => (
            <span
              key={interest.id}
              className={`${tokens.pillSize} px-2 py-0.5 rounded border font-medium`}
              style={{ backgroundColor: `${tokens.accent}15`, color: tokens.accent, borderColor: `${tokens.accent}30` }}
            >
              {interest.name}
            </span>
          ))}
        </div>
      ) : (
        <p className={`${tokens.metaSize} text-gray-600 leading-snug`}>
          {interests.map((i) => i.name).join(', ')}
        </p>
      )}
    </section>
  );
};

export default InterestsSection;
