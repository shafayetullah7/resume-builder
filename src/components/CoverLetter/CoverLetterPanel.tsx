import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Copy, Check } from 'lucide-react';
import { useResume } from '../../store/ResumeContext';
import CoverLetterTemplate from '../Preview/CoverLetterTemplate';
import { sanitizeFilename } from '../../utils/resumeFormatUtils';
import { formatCoverLetterText } from '../../utils/coverLetterFormat';
import { A4_WIDTH_MM, useA4PageZoom } from '../../hooks/useA4PageZoom';

const CoverLetterPanel: React.FC = () => {
  const { resumeData, updateCoverLetter } = useResume();
  const { coverLetter, personalInfo } = resumeData;
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageZoom = useA4PageZoom(scrollRef);
  const [copied, setCopied] = useState(false);

  const documentTitle = `${sanitizeFilename(personalInfo.fullName || 'cover-letter')}-cover-letter`;

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
  });

  const handleCopy = async () => {
    const text = formatCoverLetterText(personalInfo, coverLetter);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-gray-200">
      <div className="flex justify-between items-center bg-white p-3 shadow-sm w-full shrink-0 border-b">
        <h2 className="text-sm font-semibold text-gray-700">Cover Letter</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void handleCopy()}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md shadow-sm border border-gray-300 transition-colors"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden flex flex-col lg:flex-row gap-4 p-4 sm:p-6 md:p-8">
        <div className="flex-[2] min-h-0 overflow-y-auto bg-white rounded-lg shadow-sm p-4 order-2 lg:order-1">
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

        <div
          ref={scrollRef}
          className="flex-[3] min-h-0 overflow-auto flex justify-center w-full order-1 lg:order-2"
        >
          <div className="w-full flex justify-center">
            <div
              className="relative print:bg-white bg-white shadow-md print:shadow-none"
              style={{
                width: `${A4_WIDTH_MM}mm`,
                minHeight: '297mm',
                zoom: pageZoom,
              }}
            >
              <div ref={contentRef} className="w-full bg-white print:p-0 print:m-0">
                <CoverLetterTemplate />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPanel;
