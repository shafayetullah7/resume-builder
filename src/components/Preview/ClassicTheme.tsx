import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { themeTokens } from './Themes/themeTokens';
import ContactBlock from './sections/ContactBlock';
import SummarySection from './sections/SummarySection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import EducationSection from './sections/EducationSection';
import CertificationsSection from './sections/CertificationsSection';
import LanguagesSection from './sections/LanguagesSection';
import InterestsSection from './sections/InterestsSection';

const ClassicTheme: React.FC = () => {
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

  const tokens = themeTokens.classic;

  return (
    <div
      className={`w-full bg-white text-gray-800 ${tokens.padding} box-border ${tokens.bodySize} leading-snug`}
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}
    >
      <header className="mb-3 pb-3" style={{ borderBottom: `2px solid ${tokens.accent}` }}>
        <h1 className={`${tokens.nameSize} font-bold text-gray-900 leading-tight`}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <h2 className={`${tokens.titleSize} font-semibold`} style={{ color: tokens.accent }}>
          {personalInfo.jobTitle || 'Your Job Title'}
        </h2>
        <ContactBlock personalInfo={personalInfo} tokens={tokens} layout="inline" />
      </header>

      <SummarySection
        summary={personalInfo.summary}
        label={sectionLabels.profile}
        tokens={tokens}
        visible={sectionVisibility.summary}
      />
      <ExperienceSection
        experience={experience}
        label={sectionLabels.experience}
        tokens={tokens}
        visible={sectionVisibility.experience}
      />
      <ProjectsSection
        projects={projects}
        label={sectionLabels.projects}
        tokens={tokens}
        visible={sectionVisibility.projects}
      />
      <SkillsSection
        skills={skills}
        label={sectionLabels.skills}
        tokens={tokens}
        visible={sectionVisibility.skills}
      />
      <EducationSection
        education={education}
        label={sectionLabels.education}
        tokens={tokens}
        visible={sectionVisibility.education}
      />
      <CertificationsSection
        certifications={certifications}
        label={sectionLabels.certifications}
        tokens={tokens}
        visible={sectionVisibility.certifications}
      />
      <LanguagesSection
        languages={languages}
        label={sectionLabels.languages}
        tokens={tokens}
        visible={sectionVisibility.languages}
      />
      <InterestsSection
        interests={interests}
        interestsFormat={interestsFormat}
        interestsParagraph={interestsParagraph}
        label={sectionLabels.interests}
        tokens={tokens}
        visible={sectionVisibility.interests}
      />
    </div>
  );
};

export default ClassicTheme;
