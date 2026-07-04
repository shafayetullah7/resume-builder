import React from 'react';
import type { ThemeTokens } from '../Themes/themeTokens';
import { sectionHeaderStyle } from '../Themes/themeTokens';
import { sectionHeaderClass } from '../../../styles/documentTypography';

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
      <h3 className={`${sectionHeaderClass(tokens.typography, tokens.sectionHeaderSpacing)} flex items-center gap-2`} style={sectionHeaderStyle(tokens)}>
        {label}
      </h3>
      <p className={`text-gray-700 ${tokens.typography.body} ${tokens.summaryLeading} whitespace-pre-wrap`}>{summary}</p>
    </section>
  );
};

export default SummarySection;
