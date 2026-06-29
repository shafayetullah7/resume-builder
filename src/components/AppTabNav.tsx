import type { FC } from 'react';
import { FileText, Mail } from 'lucide-react';

export type AppTab = 'resume' | 'coverLetter';

interface AppTabNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const AppTabNav: FC<AppTabNavProps> = ({ activeTab, onTabChange }) => {
  const tabClass = (tab: AppTab, activeColor: string) =>
    `flex-1 py-3 px-4 flex items-center justify-center gap-2 font-medium text-sm transition-colors ${
      activeTab === tab
        ? `${activeColor} border-b-2 bg-gray-50`
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`;

  return (
    <nav className="flex shrink-0 bg-white shadow-sm border-b sticky top-0 z-50">
      <button
        onClick={() => onTabChange('resume')}
        className={tabClass('resume', 'text-primary-600 border-primary-600')}
      >
        <FileText size={16} />
        <span className="hidden sm:inline">Resume</span>
      </button>
      <button
        onClick={() => onTabChange('coverLetter')}
        className={tabClass('coverLetter', 'text-purple-600 border-purple-600')}
      >
        <Mail size={16} />
        <span className="hidden sm:inline">Cover Letter</span>
      </button>
    </nav>
  );
};

export default AppTabNav;
