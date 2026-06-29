import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useResume } from '../../store/ResumeContext';

const ProgressIndicator: React.FC = () => {
    const { getProgress } = useResume();
    const progress = getProgress();
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <span className="text-sm font-medium text-gray-700">Resume Progress</span>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary-600">{progress.overall}%</span>
                    {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
            </button>
            {expanded && (
                <div className="px-4 pb-4 space-y-2 border-t border-gray-100 pt-3">
                    {progress.sections.map((section) => (
                        <div key={section.name}>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>{section.name}</span>
                                <span>{section.percentage}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary-500 rounded-full transition-all"
                                    style={{ width: `${section.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProgressIndicator;
