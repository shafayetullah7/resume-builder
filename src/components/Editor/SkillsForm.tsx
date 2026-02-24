import React, { useState } from 'react';
import { useResume } from '../../store/ResumeContext';
import { Trash2, Plus, X } from 'lucide-react';

const SkillsForm: React.FC = () => {
    const { resumeData, updateSkillCategory, addSkillCategory, removeSkillCategory } = useResume();
    const { skills } = resumeData;
    const [newSkillInput, setNewSkillInput] = useState<{ [key: string]: string }>({});

    const handleCategoryChange = (id: string, value: string) => {
        updateSkillCategory(id, { category: value });
    };

    const handleAddSkill = (categoryId: string) => {
        const input = newSkillInput[categoryId]?.trim();
        if (!input) return;

        const category = skills.find(s => s.id === categoryId);
        if (category) {
            // Split by comma if user copies multiple skills
            const newSkills = input.split(',').map(s => s.trim()).filter(s => s.length > 0);
            updateSkillCategory(categoryId, {
                skills: [...category.skills, ...newSkills]
            });
            setNewSkillInput(prev => ({ ...prev, [categoryId]: '' }));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, categoryId: string) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill(categoryId);
        }
    };

    const removeSkill = (categoryId: string, indexToRemove: number) => {
        const category = skills.find(s => s.id === categoryId);
        if (category) {
            updateSkillCategory(categoryId, {
                skills: category.skills.filter((_, idx) => idx !== indexToRemove)
            });
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {skills.map((skillCat, index) => (
                <div key={skillCat.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
                    <button
                        onClick={() => removeSkillCategory(skillCat.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove Category"
                    >
                        <Trash2 size={18} />
                    </button>

                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Skill Group {index + 1}</h4>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                            <input
                                type="text"
                                value={skillCat.category}
                                onChange={(e) => handleCategoryChange(skillCat.id, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="e.g. Languages, Frameworks"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {skillCat.skills.map((skill, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                                        {skill}
                                        <button
                                            onClick={() => removeSkill(skillCat.id, idx)}
                                            className="text-primary-600 hover:text-red-500 focus:outline-none"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSkillInput[skillCat.id] || ''}
                                    onChange={(e) => setNewSkillInput(prev => ({ ...prev, [skillCat.id]: e.target.value }))}
                                    onKeyDown={(e) => handleKeyDown(e, skillCat.id)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Add a new skill and press Enter"
                                />
                                <button
                                    onClick={() => handleAddSkill(skillCat.id)}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <Plus size={18} className="text-gray-500" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Hint: You can paste comma-separated skills.</p>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={addSkillCategory}
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors font-medium"
            >
                <Plus size={18} />
                Add Skill Group
            </button>
        </div>
    );
};

export default SkillsForm;
