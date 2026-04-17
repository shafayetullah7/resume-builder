import React, { useState } from 'react';
import { Download, Copy, Check, FileJson } from 'lucide-react';
import { exportResumeToJson } from '../../utils/jsonExporter';
import { useResume } from '../../store/ResumeContext';

const ExportJson: React.FC = () => {
    const { resumeData } = useResume();
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyJson = async () => {
        const json = exportResumeToJson(resumeData);
        await navigator.clipboard.writeText(JSON.stringify(json, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadJson = () => {
        const json = exportResumeToJson(resumeData);
        const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
                <FileJson size={18} />
                Export JSON
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Export Resume as JSON</h3>
                
                <p className="text-sm text-gray-600 mb-4">
                    Export your current resume data as JSON. You can use this to back up your data or import it later.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={handleCopyJson}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button
                        onClick={handleDownloadJson}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        <Download size={18} />
                        Download JSON
                    </button>
                </div>

                <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ExportJson;
