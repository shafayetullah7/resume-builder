import React, { useState, useRef } from 'react';
import { Upload, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { extractTextFromPDF, parseResumeWithAI } from '../../utils/resumeParser';
import { useResume } from '../../store/ResumeContext';

const ImportResume: React.FC = () => {
    const { importResume } = useResume();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            const text = await extractTextFromPDF(file);
            const parsed = await parseResumeWithAI(text);

            const formattedData = {
                personalInfo: {
                    fullName: parsed.fullName || '',
                    jobTitle: parsed.jobTitle || '',
                    email: parsed.email || '',
                    phone: parsed.phone || '',
                    address: parsed.address || '',
                    linkedinUrl: parsed.linkedinUrl || '',
                    githubUrl: parsed.githubUrl || '',
                    portfolioUrl: parsed.portfolioUrl || '',
                    summary: parsed.summary || '',
                },
                experience: (parsed.experience || []).map((exp: any) => ({
                    id: Date.now().toString() + Math.random(),
                    company: exp.company || '',
                    position: exp.position || '',
                    startDate: exp.startDate || '',
                    endDate: exp.endDate || '',
                    current: exp.current || false,
                    description: exp.description || '',
                })),
                education: (parsed.education || []).map((edu: any) => ({
                    id: Date.now().toString() + Math.random(),
                    institution: edu.institution || '',
                    degree: edu.degree || '',
                    startDate: edu.startDate || '',
                    endDate: edu.endDate || '',
                })),
                skills: (parsed.skills || []).map((skillCat: any) => ({
                    id: Date.now().toString() + Math.random(),
                    category: skillCat.category || 'Skills',
                    skills: skillCat.skills || [],
                })),
                projects: (parsed.projects || []).map((proj: any) => ({
                    id: Date.now().toString() + Math.random(),
                    name: proj.name || '',
                    description: proj.description || '',
                    technologies: proj.technologies || [],
                    link: proj.link || '',
                    highlights: [],
                })),
                languages: (parsed.languages || []).map((lang: any) => ({
                    id: Date.now().toString() + Math.random(),
                    name: lang.name || '',
                    level: lang.level || '',
                })),
                interests: [],
                certifications: [],
            };

            importResume(formattedData);
            setSuccess(true);
            setTimeout(() => {
                setIsOpen(false);
                setSuccess(false);
            }, 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to parse resume');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                <Upload size={18} />
                Import Resume
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
                <h3 className="text-lg font-semibold mb-4">Import Resume from PDF</h3>
                
                <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 size={40} className="text-blue-600 animate-spin" />
                            <p className="text-gray-600">Parsing resume with AI...</p>
                            <p className="text-xs text-gray-400">This may take a moment</p>
                        </div>
                    ) : success ? (
                        <div className="flex flex-col items-center gap-2">
                            <CheckCircle size={40} className="text-green-600" />
                            <p className="text-green-600 font-medium">Resume imported successfully!</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center gap-2">
                            <AlertCircle size={40} className="text-red-500" />
                            <p className="text-red-600">{error}</p>
                            <p className="text-sm text-gray-500">Try again</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Upload size={40} className="text-gray-400" />
                            <p className="text-gray-600 font-medium">Click to upload PDF</p>
                            <p className="text-xs text-gray-400">AI will extract and fill the form</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => {
                        setIsOpen(false);
                        setError('');
                        setSuccess(false);
                    }}
                    className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ImportResume;
