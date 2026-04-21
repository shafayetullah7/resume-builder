import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Trash2, Plus } from 'lucide-react';
import type { ExperienceProject } from '../../types/resume';

const ExperienceForm: React.FC = () => {
    const { resumeData, updateExperience, addExperience, removeExperience } = useResume();
    const { experience } = resumeData;

    const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            updateExperience(id, { [name]: checked });
        } else {
            updateExperience(id, { [name]: value });
        }
    };

    // Sub-project handlers
    const handleAddProject = (expId: string) => {
        const exp = experience.find(e => e.id === expId);
        if (exp) {
            updateExperience(expId, {
                experienceProjects: [
                    ...(exp.experienceProjects || []),
                    {
                        id: Date.now().toString(),
                        name: '',
                        projectDescription: '',
                        format: 'paragraph',
                        description: '',
                        bullets: [],
                        liveLink: ''
                    }
                ]
            });
        }
    };

    const handleRemoveProject = (expId: string, projId: string) => {
        const exp = experience.find(e => e.id === expId);
        if (exp && exp.experienceProjects) {
            updateExperience(expId, {
                experienceProjects: exp.experienceProjects.filter(p => p.id !== projId)
            });
        }
    };

    const handleProjectChange = (expId: string, projId: string, field: keyof ExperienceProject, value: any) => {
        const exp = experience.find(e => e.id === expId);
        if (exp && exp.experienceProjects) {
            updateExperience(expId, {
                experienceProjects: exp.experienceProjects.map(p =>
                    p.id === projId ? { ...p, [field]: value } : p
                )
            });
        }
    };

    const handleAddBullet = (expId: string, projId: string) => {
        const exp = experience.find(e => e.id === expId);
        if (exp && exp.experienceProjects) {
            updateExperience(expId, {
                experienceProjects: exp.experienceProjects.map(p =>
                    p.id === projId ? { ...p, bullets: [...p.bullets, ''] } : p
                )
            });
        }
    };

    const handleBulletChange = (expId: string, projId: string, bIndex: number, value: string) => {
        const exp = experience.find(e => e.id === expId);
        if (exp && exp.experienceProjects) {
            updateExperience(expId, {
                experienceProjects: exp.experienceProjects.map(p => {
                    if (p.id === projId) {
                        const newBullets = [...p.bullets];
                        newBullets[bIndex] = value;
                        return { ...p, bullets: newBullets };
                    }
                    return p;
                })
            });
        }
    };

    const handleRemoveBullet = (expId: string, projId: string, bIndex: number) => {
        const exp = experience.find(e => e.id === expId);
        if (exp && exp.experienceProjects) {
            updateExperience(expId, {
                experienceProjects: exp.experienceProjects.map(p => {
                    if (p.id === projId) {
                        return { ...p, bullets: p.bullets.filter((_, i) => i !== bIndex) };
                    }
                    return p;
                })
            });
        }
    };

    return (
        <div className="flex flex-col gap-6 pb-20">
            {experience.map((exp, index) => (
                <div key={exp.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
                    <button
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove Experience"
                    >
                        <Trash2 size={18} />
                    </button>

                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Experience {index + 1}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={exp.company}
                                onChange={(e) => handleChange(exp.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Company Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                            <input
                                type="text"
                                name="position"
                                value={exp.position}
                                onChange={(e) => handleChange(exp.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Software Engineer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="text"
                                name="startDate"
                                value={exp.startDate}
                                onChange={(e) => handleChange(exp.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Jan 2021"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="text"
                                name="endDate"
                                value={exp.endDate}
                                onChange={(e) => handleChange(exp.id, e)}
                                disabled={exp.current}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 ${exp.current ? 'bg-gray-100 text-gray-400' : ''}`}
                                placeholder="Present"
                            />
                            <div className="mt-2 flex items-center">
                                <input
                                    type="checkbox"
                                    id={`current-${exp.id}`}
                                    name="current"
                                    checked={exp.current}
                                    onChange={(e) => handleChange(exp.id, e)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-gray-900">
                                    I currently work here
                                </label>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={exp.description}
                                onChange={(e) => handleChange(exp.id, e)}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Summary of responsibilities..."
                            />
                        </div>

                        {/* Nested Experience Projects */}
                        <div className="md:col-span-2 mt-2 pt-4 border-t border-gray-200">
                            <h5 className="text-sm font-semibold text-gray-700 mb-4">Projects Contributed To</h5>
                            <div className="flex flex-col gap-4">
                                {(exp.experienceProjects || []).map((proj, pIndex) => (
                                    <div key={proj.id} className="p-4 bg-white border border-gray-200 rounded-md relative shadow-sm">
                                        <button
                                            onClick={() => handleRemoveProject(exp.id, proj.id)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                            title="Remove Nested Project"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <h6 className="text-xs font-semibold text-gray-500 mb-3 uppercase">Project {pIndex + 1}</h6>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Project Name</label>
                                                <input
                                                    type="text"
                                                    value={proj.name}
                                                    onChange={(e) => handleProjectChange(exp.id, proj.id, 'name', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                                    placeholder="Project Name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Live Link (optional)</label>
                                                <input
                                                    type="text"
                                                    value={proj.liveLink || ''}
                                                    onChange={(e) => handleProjectChange(exp.id, proj.id, 'liveLink', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                                    placeholder="https://example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">What is the project?</label>
                                                <input
                                                    type="text"
                                                    value={proj.projectDescription || ''}
                                                    onChange={(e) => handleProjectChange(exp.id, proj.id, 'projectDescription', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                                    placeholder="Brief description of the project..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Format</label>
                                                <div className="flex gap-4 mt-2">
                                                    <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name={`format-${proj.id}`}
                                                            checked={proj.format === 'paragraph'}
                                                            onChange={() => handleProjectChange(exp.id, proj.id, 'format', 'paragraph')}
                                                            className="mr-2 text-primary-600 focus:ring-primary-500"
                                                        />
                                                        Paragraph
                                                    </label>
                                                    <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name={`format-${proj.id}`}
                                                            checked={proj.format === 'bullets'}
                                                            onChange={() => handleProjectChange(exp.id, proj.id, 'format', 'bullets')}
                                                            className="mr-2 text-primary-600 focus:ring-primary-500"
                                                        />
                                                        Bullet Points
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                {proj.format === 'paragraph' ? (
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                                                        <textarea
                                                            value={proj.description}
                                                            onChange={(e) => handleProjectChange(exp.id, proj.id, 'description', e.target.value)}
                                                            rows={3}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                                            placeholder="Describe the project..."
                                                        />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 mb-2">Bullet Points</label>
                                                        {proj.bullets.map((bullet, bIndex) => (
                                                            <div key={bIndex} className="flex gap-2 mb-2">
                                                                <input
                                                                    type="text"
                                                                    value={bullet}
                                                                    onChange={(e) => handleBulletChange(exp.id, proj.id, bIndex, e.target.value)}
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                                                    placeholder="Key achievement or responsibility..."
                                                                />
                                                                <button
                                                                    onClick={() => handleRemoveBullet(exp.id, proj.id, bIndex)}
                                                                    className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 border border-gray-200 rounded-md transition-colors"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => handleAddBullet(exp.id, proj.id)}
                                                            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 mt-1"
                                                        >
                                                            <Plus size={14} /> Add Bullet
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleAddProject(exp.id)}
                                    className="flex items-center justify-center gap-2 w-full py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors bg-white font-medium"
                                >
                                    <Plus size={16} />
                                    Add Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={addExperience}
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors font-medium"
            >
                <Plus size={18} />
                Add Experience
            </button>
        </div>
    );
};

export default ExperienceForm;
