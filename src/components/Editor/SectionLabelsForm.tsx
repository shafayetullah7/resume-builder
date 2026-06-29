import React from 'react';
import { useResume } from '../../store/ResumeContext';

const SectionLabelsForm: React.FC = () => {
    const { resumeData, updateSectionLabels } = useResume();
    const { sectionLabels } = resumeData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateSectionLabels({ [name]: value });
    };

    const fields: { name: keyof typeof sectionLabels; label: string }[] = [
        { name: 'profile', label: 'Profile Section' },
        { name: 'experience', label: 'Work Experience Section' },
        { name: 'education', label: 'Education Section' },
        { name: 'skills', label: 'Skills Section' },
        { name: 'projects', label: 'Projects Section' },
        { name: 'languages', label: 'Languages Section' },
        { name: 'interests', label: 'Future Focus Section' },
        { name: 'certifications', label: 'Certifications Section' },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map(({ name, label }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                        <input
                            type="text"
                            name={name}
                            value={sectionLabels[name]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionLabelsForm;
