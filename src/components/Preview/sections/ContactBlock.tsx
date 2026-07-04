import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, MessageCircle } from 'lucide-react';
import type { PersonalInfo } from '../../../types/resume';
import type { ThemeTokens } from '../Themes/themeTokens';
import { getHostname } from '../../../utils/resumeFormatUtils';

interface ContactBlockProps {
  personalInfo: PersonalInfo;
  tokens: ThemeTokens;
  layout: 'inline' | 'stacked';
}

const ContactBlock: React.FC<ContactBlockProps> = ({ personalInfo, tokens, layout }) => {
  const { typography } = tokens;
  const linkStyle = `hover:underline ${typography.meta}`;
  const linkColorStyle = { color: tokens.accent };
  const iconClass = 'print:hidden shrink-0';
  const containerClass =
    layout === 'inline'
      ? 'flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-gray-600'
      : `flex flex-col ${tokens.contactStackGap} text-gray-700`;

  const itemClass = layout === 'inline' ? 'flex items-center gap-1' : 'flex items-center gap-2';

  return (
    <>
      <div className={containerClass}>
        {personalInfo.email && (
          <div className={itemClass}>
            {tokens.showIcons && <Mail size={10} style={{ color: tokens.accent }} className={iconClass} />}
            <a href={`mailto:${personalInfo.email}`} className={linkStyle} style={linkColorStyle}>
              {personalInfo.email}
            </a>
          </div>
        )}
        {personalInfo.phone && (
          <div className={itemClass}>
            {tokens.showIcons && <Phone size={10} style={{ color: tokens.accent }} className={iconClass} />}
            <span className={typography.meta}>{personalInfo.phone}</span>
          </div>
        )}
        {personalInfo.whatsapp && (
          <div className={itemClass}>
            {tokens.showIcons && <MessageCircle size={10} style={{ color: tokens.accent }} className={iconClass} />}
            <span className={typography.meta}>{personalInfo.whatsapp}</span>
          </div>
        )}
        {personalInfo.address && (
          <div className={itemClass}>
            {tokens.showIcons && <MapPin size={10} style={{ color: tokens.accent }} className={iconClass} />}
            <span className={typography.meta}>{personalInfo.address}</span>
          </div>
        )}
        {personalInfo.portfolioUrl && (
          <div className={itemClass}>
            {tokens.showIcons && <Globe size={10} style={{ color: tokens.accent }} className={iconClass} />}
            <a href={personalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer" className={linkStyle} style={linkColorStyle}>
              {getHostname(personalInfo.portfolioUrl)}
            </a>
          </div>
        )}
        {personalInfo.linkedinUrl && (
          <div className={itemClass}>
            {tokens.showIcons && <Linkedin size={10} style={{ color: tokens.accent }} className={iconClass} />}
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkStyle} style={linkColorStyle}>
              {getHostname(personalInfo.linkedinUrl)}
            </a>
          </div>
        )}
        {personalInfo.githubUrl && (
          <div className={itemClass}>
            {tokens.showIcons && <Github size={10} style={{ color: tokens.accent }} className={iconClass} />}
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className={linkStyle} style={linkColorStyle}>
              {getHostname(personalInfo.githubUrl)}
            </a>
          </div>
        )}
      </div>

      {(personalInfo.dateOfBirth || personalInfo.nationality || personalInfo.gender) && (
        <div className={`flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-gray-500 ${typography.meta}`}>
          {personalInfo.dateOfBirth && <span>DOB: {personalInfo.dateOfBirth}</span>}
          {personalInfo.nationality && <span>Nationality: {personalInfo.nationality}</span>}
          {personalInfo.gender && <span>Gender: {personalInfo.gender}</span>}
        </div>
      )}
    </>
  );
};

export default ContactBlock;
