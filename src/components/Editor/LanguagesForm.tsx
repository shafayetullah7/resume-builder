import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Trash2, Plus } from 'lucide-react';

const LanguagesForm: React.FC = () => {
    const { resumeData, updateLanguage, addLanguage, removeLanguage } = useResume();
    const { languages } = resumeData;

    const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateLanguage(id, { [name]: value });
    };

    return (
        <div className="flex flex-col gap-6">
            {languages.map((lang, index) => (
                <div key={lang.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
                    <button
                        onClick={() => removeLanguage(lang.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove Language"
                    >
                        <Trash2 size={18} />
                    </button>

                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Language {index + 1}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                            <input
                                type="text"
                                name="name"
                                value={lang.name}
                                onChange={(e) => handleChange(lang.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="English"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level</label>
                            <select
                                name="level"
                                value={lang.level}
                                onChange={(e) => handleChange(lang.id, e)}
                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="Native">Native</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Proficient">Proficient</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Beginner">Beginner</option>
                            </select>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={addLanguage}
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors font-medium"
            >
                <Plus size={18} />
                Add Language
            </button>
        </div>
    );
};

export default LanguagesForm;
