import React from 'react';
import { useResume } from '../../store/ResumeContext';

const CoverLetterTemplate: React.FC = () => {
    const { resumeData } = useResume();
    const { personalInfo, coverLetter } = resumeData;

    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="w-full h-full bg-white text-gray-800 p-8 md:p-10 font-sans box-border text-[11pt] leading-relaxed">
            <div className="mb-6">
                <p className="text-gray-800 mb-2">{personalInfo.fullName || 'Your Name'}</p>
                <p className="text-gray-600">{personalInfo.address}</p>
                <p className="text-gray-600">{personalInfo.email}</p>
                <p className="text-gray-600">{personalInfo.phone}</p>
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

            {coverLetter.recipientName && (
                <p className="text-gray-800 mb-6">Dear {coverLetter.recipientName},</p>
            )}

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
