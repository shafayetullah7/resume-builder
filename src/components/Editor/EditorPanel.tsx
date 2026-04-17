import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import LanguagesForm from './LanguagesForm';
import InterestsForm from './InterestsForm';
import SectionLabelsForm from './SectionLabelsForm';
import ImportJson from './ImportJson';
import ExportJson from './ExportJson';
import { useResume } from '../../store/ResumeContext';
import { User, Briefcase, GraduationCap, Wrench, ChevronDown, ChevronUp, FolderGit2, Languages, Sparkles, Settings, RotateCcw } from 'lucide-react';

interface AccordionItemProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, children, isOpen, onToggle }) => {
    return (
        <div className="border border-gray-200 rounded-lg mb-4 bg-white shadow-sm overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors focus:outline-none"
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${isOpen ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}`}>
                        {icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
                </div>
                {isOpen ? (
                    <ChevronUp className="text-gray-400" size={20} />
                ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                )}
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-y-auto ${isOpen ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="p-5 border-t border-gray-100">
                    {children}
                </div>
            </div>
        </div>
    );
};

const EditorPanel: React.FC = () => {
    const [openSection, setOpenSection] = useState<string>('personal');
    const { resumeData, setTheme, resetData } = useResume();

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? '' : section);
    };

    return (
        <div className="w-full h-full p-4 md:p-6 lg:p-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Resume Content</h2>
                    <p className="text-gray-500 mt-1">Fill in your details below.</p>
                </div>

                {/* Theme Selector UI */}
                <div className="flex bg-gray-100 p-1 rounded-lg self-start sm:self-auto shadow-inner">
                    <button
                        onClick={() => setTheme('classic')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${resumeData.theme === 'classic' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Classic
                    </button>
                    <button
                        onClick={() => setTheme('modern-split')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${resumeData.theme === 'modern-split' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Modern Split
                    </button>
                </div>
            </div>

            <div className="mb-6 flex gap-3 flex-wrap">
                <ImportJson />
                <ExportJson />
            </div>

            <AccordionItem
                title="Personal Details"
                icon={<User size={20} />}
                isOpen={openSection === 'personal'}
                onToggle={() => toggleSection('personal')}
            >
                <PersonalInfoForm />
            </AccordionItem>

            <AccordionItem
                title="Professional Experience"
                icon={<Briefcase size={20} />}
                isOpen={openSection === 'experience'}
                onToggle={() => toggleSection('experience')}
            >
                <ExperienceForm />
            </AccordionItem>

            <AccordionItem
                title="Education"
                icon={<GraduationCap size={20} />}
                isOpen={openSection === 'education'}
                onToggle={() => toggleSection('education')}
            >
                <EducationForm />
            </AccordionItem>

            <AccordionItem
                title="Skills"
                icon={<Wrench size={20} />}
                isOpen={openSection === 'skills'}
                onToggle={() => toggleSection('skills')}
            >
                <SkillsForm />
            </AccordionItem>

            <AccordionItem
                title="Projects"
                icon={<FolderGit2 size={20} />}
                isOpen={openSection === 'projects'}
                onToggle={() => toggleSection('projects')}
            >
                <ProjectsForm />
            </AccordionItem>

            <AccordionItem
                title="Languages"
                icon={<Languages size={20} />}
                isOpen={openSection === 'languages'}
                onToggle={() => toggleSection('languages')}
            >
                <LanguagesForm />
            </AccordionItem>

            <AccordionItem
                title="Career Interests / Currently Learning"
                icon={<Sparkles size={20} />}
                isOpen={openSection === 'interests'}
                onToggle={() => toggleSection('interests')}
            >
                <InterestsForm />
            </AccordionItem>

            <AccordionItem
                title="Section Headers"
                icon={<Settings size={20} />}
                isOpen={openSection === 'sectionLabels'}
                onToggle={() => toggleSection('sectionLabels')}
            >
                <SectionLabelsForm />
            </AccordionItem>

            <div className="pt-8 mt-8 border-t border-gray-200">
                <button
                    onClick={resetData}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                >
                    <RotateCcw size={16} />
                    Reset to Default Data
                </button>
                <p className="mt-2 text-xs text-gray-500 text-center">
                    This will clear all your progress and restore the example content.
                </p>
            </div>
        </div>
    );
};

export default EditorPanel;
