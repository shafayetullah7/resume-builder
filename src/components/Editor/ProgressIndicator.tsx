import React from 'react';
import { useResume } from '../../store/ResumeContext';

const ProgressIndicator: React.FC = () => {
    const { getProgress } = useResume();
    const progress = getProgress();

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Resume Progress</span>
            <span className="text-lg font-bold text-primary-600">{progress.overall}%</span>
        </div>
    );
};

export default ProgressIndicator;
