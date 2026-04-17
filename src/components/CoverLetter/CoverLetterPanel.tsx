import React, { useRef } from 'react';
import { useResume } from '../../store/ResumeContext';
import CoverLetterTemplate from '../Preview/CoverLetterTemplate';

const CoverLetterPanel: React.FC = () => {
  const { resumeData, updateCoverLetter } = useResume();
  const { coverLetter } = resumeData;
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Cover Letter</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
            </style>
          </head>
          <body>${contentRef.current?.innerHTML || ''}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="w-full h-full flex flex-col pt-4 pb-12 px-2 sm:px-4 md:px-8 relative bg-gray-200">
      {/* Action Bar */}
      <div className="flex justify-between items-center bg-white p-3 rounded-t-lg shadow-sm w-full max-w-[210mm] mx-auto z-10 sticky top-0 md:static border-b">
        <h2 className="text-sm font-semibold text-gray-700">Cover Letter</h2>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
        >
          Download PDF
        </button>
      </div>

      {/* Form & Preview Side by Side */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row gap-4 mt-4">
        {/* Editor Form */}
        <div className="flex-1 lg:w-1/2 overflow-y-auto bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Edit Cover Letter</h3>
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

        {/* Preview */}
        <div className="flex-1 lg:w-1/2 overflow-auto rounded-lg shadow-sm flex justify-center">
          <div
            ref={contentRef}
            className="bg-white shadow-md"
            style={{ width: '210mm', minHeight: '297mm' }}
          >
            <CoverLetterTemplate />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPanel;
