import React from 'react';
import { useResume } from '../../store/ResumeContext';
import type { SectionVisibility } from '../../types/resume';

const SECTION_KEYS: { key: keyof SectionVisibility; label: string }[] = [
  { key: 'summary', label: 'Profile / Summary' },
  { key: 'experience', label: 'Work Experience' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills' },
  { key: 'education', label: 'Education' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'languages', label: 'Languages' },
  { key: 'interests', label: 'Interests / Future Focus' },
];

const SectionVisibilityForm: React.FC = () => {
  const { resumeData, updateSectionVisibility } = useResume();
  const { sectionVisibility } = resumeData;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-500 mb-1">
        Toggle sections on or off in the PDF preview. Hidden sections keep their data in the editor.
      </p>
      {SECTION_KEYS.map(({ key, label }) => (
        <label key={key} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={sectionVisibility[key]}
            onChange={(e) => updateSectionVisibility({ [key]: e.target.checked })}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">{label}</span>
        </label>
      ))}
    </div>
  );
};

export default SectionVisibilityForm;
