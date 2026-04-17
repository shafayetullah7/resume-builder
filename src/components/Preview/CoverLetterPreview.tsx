import React, { useState, useRef } from 'react';
import { FileText, Download, X } from 'lucide-react';
import CoverLetterTemplate from './CoverLetterTemplate';

const CoverLetterPreview: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Cover Letter</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                        </style>
                    </head>
                    <body>${contentRef.current?.innerHTML || ''}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
                <FileText size={18} />
                Cover Letter
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">Cover Letter Preview</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            <Download size={18} />
                            Download PDF
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
                <div className="overflow-auto max-h-[calc(90vh-80px)]">
                    <div ref={contentRef}>
                        <CoverLetterTemplate />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterPreview;
