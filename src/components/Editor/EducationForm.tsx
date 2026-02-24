import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Trash2, Plus } from 'lucide-react';

const EducationForm: React.FC = () => {
    const { resumeData, updateEducation, addEducation, removeEducation } = useResume();
    const { education } = resumeData;

    const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateEducation(id, { [name]: value });
    };

    return (
        <div className="flex flex-col gap-6">
            {education.map((edu, index) => (
                <div key={edu.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
                    <button
                        onClick={() => removeEducation(edu.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove Education"
                    >
                        <Trash2 size={18} />
                    </button>

                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Education {index + 1}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                            <input
                                type="text"
                                name="institution"
                                value={edu.institution}
                                onChange={(e) => handleChange(edu.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="University Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                            <input
                                type="text"
                                name="degree"
                                value={edu.degree}
                                onChange={(e) => handleChange(edu.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Bachelor of Science"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="text"
                                name="startDate"
                                value={edu.startDate}
                                onChange={(e) => handleChange(edu.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Sep 2014"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="text"
                                name="endDate"
                                value={edu.endDate}
                                onChange={(e) => handleChange(edu.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="May 2018"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={addEducation}
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors font-medium"
            >
                <Plus size={18} />
                Add Education
            </button>
        </div>
    );
};

export default EducationForm;
