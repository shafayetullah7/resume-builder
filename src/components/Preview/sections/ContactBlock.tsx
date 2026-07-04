import React from 'react';
import type { PersonalInfo } from '../../../types/resume';
import type { ThemeTokens } from '../Themes/themeTokens';
import { getHostname } from '../../../utils/resumeFormatUtils';
import {
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
  MapPinIcon,
  GlobeIcon,
  LinkedInIcon,
  GitHubIcon,
  GitLabIcon,
} from '../../../icons';

interface ContactBlockProps {
  personalInfo: PersonalInfo;
  tokens: ThemeTokens;
  layout: 'inline' | 'stacked';
}

const CONTACT_ICON_SIZE = 12;

const ContactBlock: React.FC<ContactBlockProps> = ({ personalInfo, tokens, layout }) => {
  const { typography } = tokens;
  const linkStyle = `hover:underline ${typography.meta}`;
  const linkColorStyle = { color: tokens.accent };
  const iconClass = 'shrink-0';
  const iconStyle = { color: tokens.accent };
  const containerClass =
    layout === 'inline'
      ? 'flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-gray-600'
      : `flex flex-col ${tokens.contactStackGap} text-gray-700`;

  const itemClass = layout === 'inline' ? 'flex items-center gap-1' : 'flex items-center gap-2';

  const renderIcon = (icon: React.ReactNode) =>
    tokens.showIcons ? (
      <span className={iconClass} style={iconStyle}>
        {icon}
      </span>
    ) : null;

  return (
    <>
      <div className={containerClass}>
        {personalInfo.email && (
          <div className={itemClass}>
            {renderIcon(<MailIcon size={CONTACT_ICON_SIZE} />)}
            <a href={`mailto:${personalInfo.email}`} className={linkStyle} style={linkColorStyle}>
              {personalInfo.email}
            </a>
          </div>
        )}
        {personalInfo.phone && (
          <div className={itemClass}>
            {renderIcon(<PhoneIcon size={CONTACT_ICON_SIZE} />)}
            <span className={typography.meta}>{personalInfo.phone}</span>
          </div>
        )}
        {personalInfo.whatsapp && (
          <div className={itemClass}>
            {renderIcon(<WhatsAppIcon size={CONTACT_ICON_SIZE} />)}
            <span className={typography.meta}>{personalInfo.whatsapp}</span>
          </div>
        )}
        {personalInfo.address && (
          <div className={itemClass}>
            {renderIcon(<MapPinIcon size={CONTACT_ICON_SIZE} />)}
            <span className={typography.meta}>{personalInfo.address}</span>
          </div>
        )}
        {personalInfo.portfolioUrl && (
          <div className={itemClass}>
            {renderIcon(<GlobeIcon size={CONTACT_ICON_SIZE} />)}
            <a href={personalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer" className={linkStyle} style={linkColorStyle}>
              {getHostname(personalInfo.portfolioUrl)}
            </a>
          </div>
        )}
        {personalInfo.linkedinUrl && (
          <div className={itemClass}>
            {renderIcon(<LinkedInIcon size={CONTACT_ICON_SIZE} />)}
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkStyle} style={linkColorStyle}>
              {getHostname(personalInfo.linkedinUrl)}
            </a>
          </div>
        )}
        {personalInfo.githubUrl && (
          <div className={itemClass}>
            {renderIcon(<GitHubIcon size={CONTACT_ICON_SIZE} />)}
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className={linkStyle} style={linkColorStyle}>
              {getHostname(personalInfo.githubUrl)}
            </a>
          </div>
        )}
        {personalInfo.gitlabUrl && (
          <div className={itemClass}>
            {renderIcon(<GitLabIcon size={CONTACT_ICON_SIZE} />)}
            <a href={personalInfo.gitlabUrl} target="_blank" rel="noopener noreferrer" className={linkStyle} style={linkColorStyle}>
              {getHostname(personalInfo.gitlabUrl)}
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
