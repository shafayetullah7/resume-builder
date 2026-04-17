import React from 'react';
import { useResume } from '../../store/ResumeContext';

const CoverLetterForm: React.FC = () => {
    const { resumeData, updateCoverLetter } = useResume();
    const { coverLetter } = resumeData;

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
                <input
                    type="text"
                    value={coverLetter.recipientName}
                    onChange={(e) => updateCoverLetter({ recipientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Hiring Manager"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Title</label>
                <input
                    type="text"
                    value={coverLetter.recipientTitle}
                    onChange={(e) => updateCoverLetter({ recipientTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Software Engineering Manager"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                    type="text"
                    value={coverLetter.companyName}
                    onChange={(e) => updateCoverLetter({ companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Tech Company Inc."
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                <input
                    type="text"
                    value={coverLetter.companyAddress}
                    onChange={(e) => updateCoverLetter({ companyAddress: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="123 Business St, City, State 12345"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter Content</label>
                <textarea
                    value={coverLetter.content}
                    onChange={(e) => updateCoverLetter({ content: e.target.value })}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Write your cover letter here..."
                />
            </div>
        </div>
    );
};

export default CoverLetterForm;
