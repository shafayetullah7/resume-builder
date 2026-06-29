import React from 'react';
import { Award } from 'lucide-react';
import type { Certification } from '../../../types/resume';
import type { ThemeTokens } from '../Themes/themeTokens';
import { sectionHeaderClass, sectionHeaderStyle } from '../Themes/themeTokens';
import { formatDate, getHostname } from '../../../utils/resumeFormatUtils';

interface CertificationsSectionProps {
  certifications: Certification[];
  label: string;
  tokens: ThemeTokens;
  visible: boolean;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications, label, tokens, visible }) => {
  if (!visible || certifications.length === 0) return null;

  return (
    <section className={`${tokens.sectionGap} break-inside-avoid`}>
      <h3 className={sectionHeaderClass(tokens)} style={sectionHeaderStyle(tokens)}>
        {label}
      </h3>
      <div className="flex flex-col gap-2">
        {certifications.map((cert) => (
          <div key={cert.id}>
            <div className="flex items-center gap-1">
              <Award size={10} style={{ color: tokens.accent }} className="print:hidden" />
              <span className={`${tokens.bodySize} font-semibold text-gray-800`}>{cert.name}</span>
            </div>
            <span className={`${tokens.metaSize} text-gray-500 ml-4 block`}>
              {cert.issuer} ({formatDate(cert.date)})
              {cert.url && (
                <>
                  {' · '}
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: tokens.accent }}>
                    {getHostname(cert.url)}
                  </a>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
