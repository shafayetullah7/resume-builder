import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { letterText } from '../../styles/documentTypography';
import { getCoverLetterDate, getCoverLetterSalutation } from '../../utils/coverLetterFormat';

const CoverLetterTemplate: React.FC = () => {
    const { resumeData } = useResume();
    const { personalInfo, coverLetter } = resumeData;

    const today = getCoverLetterDate();
    const salutation = getCoverLetterSalutation(coverLetter);

    return (
        <div
            className={`w-full h-full bg-white text-gray-800 p-8 md:p-10 box-border ${letterText.body} leading-relaxed`}
            style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}
        >
            <div className="mb-6">
                <p className="text-gray-800 mb-2">{personalInfo.fullName || 'Your Name'}</p>
                {personalInfo.address && <p className="text-gray-600">{personalInfo.address}</p>}
                {personalInfo.email && <p className="text-gray-600">{personalInfo.email}</p>}
                {personalInfo.phone && <p className="text-gray-600">{personalInfo.phone}</p>}
            </div>

            <p className="text-gray-800 mb-4">{today}</p>

            {coverLetter.recipientName && (
                <p className="text-gray-800 mb-1">{coverLetter.recipientName}</p>
            )}
            {coverLetter.recipientTitle && (
                <p className="text-gray-800 mb-1">{coverLetter.recipientTitle}</p>
            )}
            {coverLetter.companyName && (
                <p className="text-gray-800 mb-1">{coverLetter.companyName}</p>
            )}
            {coverLetter.companyAddress && (
                <p className="text-gray-800 mb-4">{coverLetter.companyAddress}</p>
            )}

            <p className="text-gray-800 mb-6">{salutation}</p>

            <div className="whitespace-pre-wrap text-gray-700 mb-6">
                {coverLetter.content || 'Your cover letter content will appear here...'}
            </div>

            <div className="text-gray-800">
                <p className="mb-2">Sincerely,</p>
                <p>{personalInfo.fullName || 'Your Name'}</p>
            </div>
        </div>
    );
};

export default CoverLetterTemplate;
