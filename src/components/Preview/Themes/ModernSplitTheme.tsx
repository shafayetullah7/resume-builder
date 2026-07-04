import React from 'react';
import { useResume } from '../../../store/ResumeContext';
import { getSidebarTokens, themeTokens } from '../Themes/themeTokens';
import ContactBlock from '../sections/ContactBlock';
import SummarySection from '../sections/SummarySection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';
import SkillsSection from '../sections/SkillsSection';
import EducationSection from '../sections/EducationSection';
import CertificationsSection from '../sections/CertificationsSection';
import LanguagesSection from '../sections/LanguagesSection';
import InterestsSection from '../sections/InterestsSection';

const ModernSplitTheme: React.FC = () => {
  const { resumeData } = useResume();
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    languages,
    interests,
    certifications,
    sectionLabels,
    sectionVisibility,
    interestsFormat,
    interestsParagraph,
  } = resumeData;

  const tokens = themeTokens['modern-split'];
  const sidebarTokens = getSidebarTokens(tokens);

  return (
    <div
      className="w-full bg-white text-gray-800 box-border"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}
    >
      <div className="flex min-h-0">
        <div className={`w-1/3 ${tokens.sidebarBg} print:bg-white ${tokens.padding} flex flex-col border-r border-gray-300`}>
          <div className="border-b border-gray-200 pb-2 mb-2.5">
            <h1 className={`${tokens.typography.display} font-bold leading-tight`} style={{ color: tokens.accent }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className={`${tokens.typography.body} font-semibold mt-0.5`} style={{ color: tokens.accent }}>
              {personalInfo.jobTitle || 'Your Job Title'}
            </p>
            <ContactBlock personalInfo={personalInfo} tokens={sidebarTokens} layout="stacked" />
          </div>

          <SkillsSection skills={skills} label={sectionLabels.skills} tokens={sidebarTokens} visible={sectionVisibility.skills} />
          <EducationSection education={education} label={sectionLabels.education} tokens={sidebarTokens} visible={sectionVisibility.education} />
          <CertificationsSection certifications={certifications} label={sectionLabels.certifications} tokens={sidebarTokens} visible={sectionVisibility.certifications} />
          <LanguagesSection languages={languages} label={sectionLabels.languages} tokens={sidebarTokens} visible={sectionVisibility.languages} />
          <InterestsSection
            interests={interests}
            interestsFormat={interestsFormat}
            interestsParagraph={interestsParagraph}
            label={sectionLabels.interests}
            tokens={sidebarTokens}
            visible={sectionVisibility.interests}
          />
        </div>

        <div className={`w-2/3 ${tokens.padding} flex flex-col`}>
          <SummarySection summary={personalInfo.summary} label={sectionLabels.profile} tokens={tokens} visible={sectionVisibility.summary} />
          <ExperienceSection experience={experience} label={sectionLabels.experience} tokens={tokens} visible={sectionVisibility.experience} />
          <ProjectsSection projects={projects} label={sectionLabels.projects} tokens={tokens} visible={sectionVisibility.projects} />
        </div>
      </div>
    </div>
  );
};

export default ModernSplitTheme;
