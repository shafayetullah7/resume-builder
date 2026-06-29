import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download } from 'lucide-react';
import { useResume } from '../../store/ResumeContext';
import CoverLetterTemplate from '../Preview/CoverLetterTemplate';
import { sanitizeFilename } from '../../utils/resumeFormatUtils';

const CoverLetterPanel: React.FC = () => {
  const { resumeData, updateCoverLetter } = useResume();
  const { coverLetter, personalInfo } = resumeData;
  const contentRef = useRef<HTMLDivElement>(null);

  const documentTitle = `${sanitizeFilename(personalInfo.fullName || 'cover-letter')}-cover-letter`;

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
  });

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-gray-200">
      <div className="flex justify-between items-center bg-white p-3 shadow-sm w-full shrink-0 border-b">
        <h2 className="text-sm font-semibold text-gray-700">Cover Letter</h2>
        <button
          onClick={() => handlePrint()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden flex flex-col lg:flex-row gap-4 p-4 sm:p-6 md:p-8">
        <div className="flex-1 min-h-0 lg:w-1/2 overflow-auto flex justify-center w-full order-1 lg:order-2">
          <div className="w-full flex justify-center">
            <div
              ref={contentRef}
              className="bg-white shadow-md print:shadow-none shrink-0"
              style={{
                width: '210mm',
                minHeight: '297mm',
                zoom: 'min(1, calc((100% - 2rem) / 210mm))',
              }}
            >
              <CoverLetterTemplate />
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 lg:w-1/2 overflow-y-auto bg-white rounded-lg shadow-sm p-4 order-2 lg:order-1">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Edit Cover Letter</h3>
          <p className="text-xs text-gray-500 mb-4">
            Your name and contact details in the letter preview come from{' '}
            <strong>Personal Details</strong> in the Resume workspace.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Recipient Name</label>
              <input
                type="text"
                value={coverLetter.recipientName}
                onChange={(e) => updateCoverLetter({ recipientName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Hiring Manager"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Recipient Title</label>
              <input
                type="text"
                value={coverLetter.recipientTitle}
                onChange={(e) => updateCoverLetter({ recipientTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Software Engineering Manager"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company Name</label>
              <input
                type="text"
                value={coverLetter.companyName}
                onChange={(e) => updateCoverLetter({ companyName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Tech Company Inc."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Company Address</label>
              <input
                type="text"
                value={coverLetter.companyAddress}
                onChange={(e) => updateCoverLetter({ companyAddress: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="123 Business St, City, State 12345"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Cover Letter Content</label>
              <textarea
                value={coverLetter.content}
                onChange={(e) => updateCoverLetter({ content: e.target.value })}
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Write your cover letter here..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPanel;
