import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download } from 'lucide-react';
import ModernSplitTheme from './Themes/ModernSplitTheme';
import { useResume } from '../../store/ResumeContext';
import ResumeTemplate from './ResumeTemplate';

const PreviewPanel: React.FC = () => {
    const { resumeData } = useResume();
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef,
        documentTitle: 'Resume',
    });

    return (
        <div className="w-full h-full flex flex-col pt-4 pb-12 px-2 sm:px-4 md:px-8 relative bg-gray-200">
            {/* Action Bar */}
            <div className="flex justify-between items-center bg-white p-3 rounded-t-lg shadow-sm w-full max-w-[210mm] mx-auto z-10 sticky top-0 md:static border-b">
                <h2 className="text-sm font-semibold text-gray-700 hidden sm:block">Live Preview</h2>
                <div className="flex-1 sm:flex-none"></div>
                <button
                    onClick={() => handlePrint()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
                >
                    <Download size={16} />
                    <span>Download PDF</span>
                </button>
            </div>

            {/* A4 Container */}
            <div className="w-full flex-1 overflow-auto rounded-b-lg shadow-sm flex flex-col items-center">
                <div
                    className="relative max-w-full print:bg-white bg-white shadow-md mx-auto print:shadow-none print:mx-0 overflow-hidden transform-origin-top"
                    style={{
                        width: '210mm',
                        minHeight: 'auto',
                        zoom: 'clamp(0.4, 100vw / 220mm, 1)',
                    }}
                >
                    <div ref={contentRef} className="w-full bg-white print:p-0 print:m-0" style={{ minHeight: 'auto' }}>
                        {resumeData.theme === 'modern-split' ? <ModernSplitTheme /> : <ResumeTemplate />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPanel;
