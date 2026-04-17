import React, { useState, useRef } from 'react';
import { Upload, Download, Copy, Check, AlertCircle, FileJson } from 'lucide-react';
import { getJsonTemplate, parseJsonResume } from '../../utils/jsonImporter';
import { useResume } from '../../store/ResumeContext';

const ImportJson: React.FC = () => {
    const { importResume } = useResume();
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<'paste' | 'upload' | null>(null);
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDownloadTemplate = () => {
        const template = getJsonTemplate();
        const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume-template.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleCopyTemplate = async () => {
        const template = getJsonTemplate();
        await navigator.clipboard.writeText(JSON.stringify(template, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = parseJsonResume(event.target?.result as string);
                importResume(parsed);
                setSuccess(true);
                setTimeout(() => {
                    setIsOpen(false);
                    setMode(null);
                    setSuccess(false);
                }, 1500);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to parse JSON');
            }
        };
        reader.readAsText(file);
    };

    const handlePaste = () => {
        try {
            const parsed = parseJsonResume(jsonInput);
            importResume(parsed);
            setSuccess(true);
            setTimeout(() => {
                setIsOpen(false);
                setMode(null);
                setSuccess(false);
                setJsonInput('');
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to parse JSON');
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
                <FileJson size={18} />
                Import JSON
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 shadow-xl max-h-[80vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Import Resume from JSON</h3>

                {!mode && (
                    <div className="space-y-3">
                        <button
                            onClick={() => setMode('paste')}
                            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors flex items-center justify-center gap-3"
                        >
                            <Upload size={24} className="text-gray-400" />
                            <div className="text-left">
                                <p className="font-medium text-gray-700">Paste JSON</p>
                                <p className="text-sm text-gray-500">Paste your filled JSON directly</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setMode('upload')}
                            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors flex items-center justify-center gap-3"
                        >
                            <FileJson size={24} className="text-gray-400" />
                            <div className="text-left">
                                <p className="font-medium text-gray-700">Upload JSON File</p>
                                <p className="text-sm text-gray-500">Upload a .json file</p>
                            </div>
                        </button>

                        <div className="border-t pt-4 mt-4">
                            <p className="text-sm text-gray-600 mb-3">Don't have the format? Get the template:</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDownloadTemplate}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <Download size={18} />
                                    Download Template
                                </button>
                                <button
                                    onClick={handleCopyTemplate}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                    {copied ? 'Copied!' : 'Copy Template'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'paste' && (
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Paste your JSON here:
                            </label>
                            <textarea
                                value={jsonInput}
                                onChange={(e) => {
                                    setJsonInput(e.target.value);
                                    setError('');
                                }}
                                className="w-full h-64 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder='{"personalInfo": {...}, "experience": [...]}'
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle size={14} />
                                    {error}
                                </p>
                            )}
                            {success && (
                                <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                                    <Check size={14} />
                                    Resume imported successfully!
                                </p>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setMode(null);
                                    setError('');
                                    setJsonInput('');
                                }}
                                className="flex-1 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Back
                            </button>
                            <button
                                onClick={handlePaste}
                                disabled={!jsonInput.trim()}
                                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Import
                            </button>
                        </div>
                    </div>
                )}

                {mode === 'upload' && (
                    <div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <div 
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload size={40} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-600 font-medium">Click to upload JSON file</p>
                            <p className="text-sm text-gray-400">.json files only</p>
                        </div>
                        {error && (
                            <p className="mt-3 text-sm text-red-600 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="mt-3 text-sm text-green-600 flex items-center gap-1">
                                <Check size={14} />
                                Resume imported successfully!
                            </p>
                        )}
                        <button
                            onClick={() => {
                                setMode(null);
                                setError('');
                            }}
                            className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
                        >
                            Back
                        </button>
                    </div>
                )}

                <button
                    onClick={() => {
                        setIsOpen(false);
                        setMode(null);
                        setError('');
                        setJsonInput('');
                    }}
                    className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800 border-t pt-4"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ImportJson;
