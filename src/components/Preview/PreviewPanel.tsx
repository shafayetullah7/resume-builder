import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, AlertCircle, X } from 'lucide-react';
import ModernSplitTheme from './Themes/ModernSplitTheme';
import ClassicTheme from './ClassicTheme';
import { useResume } from '../../store/ResumeContext';
import { sanitizeFilename } from '../../utils/resumeFormatUtils';
import { validateResumeForExport, hasBlockingIssues } from '../../utils/resumeValidation';
import type { ValidationIssue } from '../../utils/resumeValidation';

const A4_WIDTH_MM = 210;

const PreviewPanel: React.FC = () => {
    const { resumeData } = useResume();
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [pageZoom, setPageZoom] = useState(1);
    const [validationIssues, setValidationIssues] = useState<ValidationIssue[] | null>(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const updateZoom = () => {
            const padding = 32;
            const available = container.clientWidth - padding;
            const probe = document.createElement('div');
            probe.style.width = `${A4_WIDTH_MM}mm`;
            probe.style.position = 'absolute';
            probe.style.visibility = 'hidden';
            document.body.appendChild(probe);
            const pageWidthPx = probe.getBoundingClientRect().width;
            document.body.removeChild(probe);
            if (pageWidthPx > 0) {
                setPageZoom(Math.min(1, available / pageWidthPx));
            }
        };

        updateZoom();
        const observer = new ResizeObserver(updateZoom);
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const documentTitle = `${sanitizeFilename(resumeData.personalInfo.fullName)}-resume`;

    const handlePrint = useReactToPrint({
        contentRef,
        documentTitle,
    });

    const triggerPrint = useCallback(() => {
        handlePrint();
    }, [handlePrint]);

    const handleDownloadClick = () => {
        const issues = validateResumeForExport(resumeData);
        if (issues.length === 0) {
            triggerPrint();
            return;
        }
        if (hasBlockingIssues(issues)) {
            setValidationIssues(issues);
            return;
        }
        setValidationIssues(issues);
    };

    const handleProceed = () => {
        setValidationIssues(null);
        triggerPrint();
    };

    return (
        <div className="w-full h-full flex flex-col relative bg-gray-200">
            <div className="flex justify-between items-center bg-white p-3 shadow-sm w-full z-10 shrink-0 border-b">
                <h2 className="text-sm font-semibold text-gray-700">Live Preview</h2>
                <button
                    onClick={handleDownloadClick}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
                >
                    <Download size={16} />
                    <span>Download PDF</span>
                </button>
            </div>

            <div ref={scrollRef} className="w-full flex-1 min-h-0 overflow-auto p-4 sm:p-6 md:p-8">
                <div className="w-full flex justify-center">
                    <div
                        className="relative print:bg-white bg-white shadow-md print:shadow-none overflow-hidden"
                        style={{
                            width: `${A4_WIDTH_MM}mm`,
                            minHeight: 'auto',
                            zoom: pageZoom,
                        }}
                    >
                    <div ref={contentRef} className="w-full bg-white print:p-0 print:m-0" style={{ minHeight: 'auto' }}>
                        {resumeData.theme === 'modern-split' ? <ModernSplitTheme /> : <ClassicTheme />}
                    </div>
                    </div>
                </div>
            </div>

            {validationIssues && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="text-amber-500" size={20} />
                                <h3 className="text-lg font-semibold text-gray-900">Before you export</h3>
                            </div>
                            <button onClick={() => setValidationIssues(null)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <ul className="space-y-2 mb-6">
                            {validationIssues.map((issue, i) => (
                                <li
                                    key={i}
                                    className={`text-sm flex gap-2 ${issue.type === 'block' ? 'text-red-700' : 'text-amber-700'}`}
                                >
                                    <span>{issue.type === 'block' ? '✕' : '!'}</span>
                                    <span>{issue.message}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setValidationIssues(null)}
                                className="flex-1 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
                            >
                                Go Back
                            </button>
                            {!hasBlockingIssues(validationIssues) && (
                                <button
                                    onClick={handleProceed}
                                    className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                                >
                                    Export Anyway
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PreviewPanel;
