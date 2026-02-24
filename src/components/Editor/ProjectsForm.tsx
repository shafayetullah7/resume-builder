import React from 'react';
import { useResume } from '../../store/ResumeContext';
import { Trash2, Plus } from 'lucide-react';

const ProjectsForm: React.FC = () => {
    const { resumeData, updateProject, addProject, removeProject } = useResume();
    const { projects } = resumeData;

    const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Handle comma separated technologies/highlights
        if (name === 'technologies' || name === 'highlights') {
            const arrayValue = value.split(',').map(item => item.trim());
            updateProject(id, { [name]: arrayValue });
        } else {
            updateProject(id, { [name]: value });
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                            <input
                                type="url"
                                name="link"
                                value={proj.link || ''}
                                onChange={(e) => handleChange(proj.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="https://github.com/..."
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
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (Comma separated)</label>
                            <input
                                type="text"
                                name="technologies"
                                value={proj.technologies.join(', ')}
                                onChange={(e) => handleChange(proj.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="React, Node.js, Tailwind"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (Comma separated sentences)</label>
                            <textarea
                                name="highlights"
                                value={proj.highlights.join(', ')}
                                onChange={(e) => handleChange(proj.id, e)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Implemented OAuth2 login, Increased performance by 20%"
                            />
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
