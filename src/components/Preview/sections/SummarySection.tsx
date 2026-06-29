import React from 'react';
import type { ThemeTokens } from '../Themes/themeTokens';
import { sectionHeaderClass, sectionHeaderStyle } from '../Themes/themeTokens';

interface SummarySectionProps {
  summary: string;
  label: string;
  tokens: ThemeTokens;
  visible: boolean;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary, label, tokens, visible }) => {
  if (!visible || !summary) return null;

  return (
    <section className={`${tokens.sectionGap} break-inside-avoid`}>
      <h3 className={`${sectionHeaderClass(tokens)} flex items-center gap-2`} style={sectionHeaderStyle(tokens)}>
        {label}
      </h3>
      <p className={`text-gray-700 ${tokens.bodySize} leading-relaxed whitespace-pre-wrap`}>{summary}</p>
    </section>
  );
};

export default SummarySection;
