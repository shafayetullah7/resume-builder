import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Trash2, Plus } from 'lucide-react';

const LINK_LABELS = [
    'Live Demo',
    'Admin Panel',
    'Backend API',
    'Frontend',
    'Mobile App',
    'GitHub',
    'Documentation',
    'Other'
];

const ProjectsForm: React.FC = () => {
    const { resumeData, updateProject, addProject, removeProject } = useResume();
    const { projects } = resumeData;

    const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'technologies' || name === 'highlights') {
            const arrayValue = value.split(',').map(item => item.trim());
            updateProject(id, { [name]: arrayValue });
        } else {
            updateProject(id, { [name]: value });
        }
    };

    const handleAddLink = (projectId: string) => {
        const proj = projects.find(p => p.id === projectId);
        if (proj) {
            updateProject(projectId, {
                links: [...(proj.links || []), { label: 'Live Demo', liveUrl: '', githubUrl: '' }]
            });
        }
    };

    const handleRemoveLink = (projectId: string, linkIndex: number) => {
        const proj = projects.find(p => p.id === projectId);
        if (proj && proj.links) {
            updateProject(projectId, {
                links: proj.links.filter((_, i) => i !== linkIndex)
            });
        }
    };

    const handleLinkChange = (projectId: string, linkIndex: number, field: 'label' | 'liveUrl' | 'githubUrl', value: string) => {
        const proj = projects.find(p => p.id === projectId);
        if (proj && proj.links) {
            const newLinks = [...proj.links];
            newLinks[linkIndex] = { ...newLinks[linkIndex], [field]: value };
            updateProject(projectId, { links: newLinks });
        }
    };

    const handleAddHighlight = (projectId: string) => {
        const proj = projects.find(p => p.id === projectId);
        if (proj) {
            updateProject(projectId, {
                highlights: [...proj.highlights, '']
            });
        }
    };

    const handleRemoveHighlight = (projectId: string, index: number) => {
        const proj = projects.find(p => p.id === projectId);
        if (proj) {
            updateProject(projectId, {
                highlights: proj.highlights.filter((_, i) => i !== index)
            });
        }
    };

    const handleHighlightChange = (projectId: string, index: number, value: string) => {
        const proj = projects.find(p => p.id === projectId);
        if (proj) {
            const newHighlights = [...proj.highlights];
            newHighlights[index] = value;
            updateProject(projectId, { highlights: newHighlights });
        }
    };

    const handleAddTechnology = (projectId: string) => {
        const proj = projects.find(p => p.id === projectId);
        if (proj) {
            updateProject(projectId, {
                technologies: [...proj.technologies, '']
            });
        }
    };

    const handleRemoveTechnology = (projectId: string, index: number) => {
        const proj = projects.find(p => p.id === projectId);
        if (proj) {
            updateProject(projectId, {
                technologies: proj.technologies.filter((_, i) => i !== index)
            });
        }
    };

    const handleTechnologyChange = (projectId: string, index: number, value: string) => {
        const proj = projects.find(p => p.id === projectId);
        if (proj) {
            const newTech = [...proj.technologies];
            newTech[index] = value;
            updateProject(projectId, { technologies: newTech });
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {projects.map((proj, index) => (
                <div key={proj.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
                    <button
                        onClick={() => removeProject(proj.id)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove Project"
                    >
                        <Trash2 size={18} />
                    </button>

                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Project {index + 1}</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                value={proj.name}
                                onChange={(e) => handleChange(proj.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Awesome Dashboard"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="text"
                                name="startDate"
                                value={proj.startDate || ''}
                                onChange={(e) => handleChange(proj.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Jan 2022"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="text"
                                name="endDate"
                                value={proj.endDate || ''}
                                onChange={(e) => handleChange(proj.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Mar 2022"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                            <input
                                type="text"
                                name="description"
                                value={proj.description}
                                onChange={(e) => handleChange(proj.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="A web application that does..."
                            />
                        </div>

                        {/* Dynamic Technologies */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                            <div className="flex flex-col gap-2">
                                {proj.technologies.map((tech, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={tech}
                                            onChange={(e) => handleTechnologyChange(proj.id, i, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                            placeholder="React"
                                        />
                                        <button
                                            onClick={() => handleRemoveTechnology(proj.id, i)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleAddTechnology(proj.id)}
                                    className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    <Plus size={14} /> Add Technology
                                </button>
                            </div>
                        </div>

                        {/* Dynamic Highlights */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Highlights</label>
                            <div className="flex flex-col gap-2">
                                {proj.highlights.map((highlight, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={highlight}
                                            onChange={(e) => handleHighlightChange(proj.id, i, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                            placeholder="Implemented OAuth2 login"
                                        />
                                        <button
                                            onClick={() => handleRemoveHighlight(proj.id, i)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleAddHighlight(proj.id)}
                                    className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    <Plus size={14} /> Add Highlight
                                </button>
                            </div>
                        </div>

                        {/* Dynamic Links Section */}
                        <div className="md:col-span-2 pt-4 border-t border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Project Links</label>
                            <div className="flex flex-col gap-3">
                                {(proj.links || []).map((link, linkIndex) => (
                                    <div key={linkIndex} className="p-3 bg-white border border-gray-200 rounded-md">
                                        <div className="flex gap-2 items-start mb-2">
                                            <select
                                                value={link.label}
                                                onChange={(e) => handleLinkChange(proj.id, linkIndex, 'label', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm min-w-[140px]"
                                            >
                                                {LINK_LABELS.map(label => (
                                                    <option key={label} value={label}>{label}</option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleRemoveLink(proj.id, linkIndex)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Remove Link"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <input
                                                type="url"
                                                value={link.liveUrl}
                                                onChange={(e) => handleLinkChange(proj.id, linkIndex, 'liveUrl', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                                placeholder="Live URL (optional)"
                                            />
                                            <input
                                                type="url"
                                                value={link.githubUrl}
                                                onChange={(e) => handleLinkChange(proj.id, linkIndex, 'githubUrl', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                                                placeholder="GitHub URL (optional)"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleAddLink(proj.id)}
                                    className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    <Plus size={14} /> Add Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={addProject}
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors font-medium"
            >
                <Plus size={18} />
                Add Project
            </button>
        </div>
    );
};

export default ProjectsForm;
