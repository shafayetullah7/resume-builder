import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Trash2, Plus } from 'lucide-react';

const InterestsForm: React.FC = () => {
    const { resumeData, updateInterest, addInterest, removeInterest, updateInterestsFormat, updateInterestsParagraph } = useResume();
    const { interests, interestsFormat, interestsParagraph } = resumeData;

    const handleInterestChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        updateInterest(id, { name: value });
    };

    const handleParagraphChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateInterestsParagraph(e.target.value);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Format Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-lg self-start shadow-inner mb-2">
                <button
                    onClick={() => updateInterestsFormat('bullets')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${interestsFormat === 'bullets' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Bullet Points
                </button>
                <button
                    onClick={() => updateInterestsFormat('paragraph')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${interestsFormat === 'paragraph' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Paragraph
                </button>
            </div>

            {interestsFormat === 'bullets' ? (
                <>
                    {interests.map((interest, index) => (
                        <div key={interest.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
                            <button
                                onClick={() => removeInterest(interest.id)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                title="Remove Interest"
                            >
                                <Trash2 size={18} />
                            </button>

                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Interest {index + 1}</h4>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Career path / Interest / Curiosity </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={interest.name}
                                        onChange={(e) => handleInterestChange(interest.id, e)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Quantum Computing, Distributed Systems, User-Centric Design"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={addInterest}
                        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors font-medium"
                    >
                        <Plus size={18} />
                        Add Interest
                    </button>
                </>
            ) : (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Future Focus / Career Direction</label>
                    <textarea
                        value={interestsParagraph}
                        onChange={handleParagraphChange}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="I am passionate about transitioning into AI engineering, specifically focusing on building agentic systems that can solve complex real-world problems. I spend my free time exploring LLM architectures and..."
                    />
                </div>
            )}
        </div>
    );
};

export default InterestsForm;
