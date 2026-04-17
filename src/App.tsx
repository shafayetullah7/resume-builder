import { useState } from 'react';
import { ResumeProvider } from './store/ResumeContext';
import EditorPanel from './components/Editor/EditorPanel';
import PreviewPanel from './components/Preview/PreviewPanel';
import CoverLetterPanel from './components/CoverLetter/CoverLetterPanel';
import { FileText, Edit2, Mail } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'coverLetter'>('editor');

  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Mobile Header / Navigation */}
        <header className="bg-white shadow-sm sticky top-0 z-50 lg:hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-medium text-sm transition-colors ${
                activeTab === 'editor'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Edit2 size={16} />
              Editor
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-medium text-sm transition-colors ${
                activeTab === 'preview'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText size={16} />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('coverLetter')}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-medium text-sm transition-colors ${
                activeTab === 'coverLetter'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Mail size={16} />
              Cover Letter
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-53px)] lg:h-screen">
          {/* Left Panel: Editor */}
          <div
            className={`flex-1 overflow-y-auto bg-white border-r border-gray-200 transition-all ${
              activeTab === 'editor' ? 'block' : 'hidden'
            } lg:block lg:w-1/2 xl:w-5/12`}
          >
            <EditorPanel />
          </div>

          {/* Right Panel: Preview */}
          <div
            className={`flex-1 overflow-y-auto bg-gray-100 transition-all flex justify-center ${
              activeTab === 'preview' ? 'block' : 'hidden'
            } lg:block lg:w-1/2 xl:w-7/12`}
          >
            <PreviewPanel />
          </div>

          {/* Cover Letter Panel (full width) */}
          <div
            className={`flex-1 overflow-hidden transition-all ${
              activeTab === 'coverLetter' ? 'block' : 'hidden'
            } lg:block`}
          >
            <CoverLetterPanel />
          </div>
        </main>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex bg-white shadow-sm border-t sticky bottom-0">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-3 px-6 flex items-center justify-center gap-2 font-medium text-sm transition-colors ${
              activeTab === 'editor'
                ? 'text-primary-600 border-t-2 border-primary-600 bg-primary-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Edit2 size={18} />
            Editor
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 px-6 flex items-center justify-center gap-2 font-medium text-sm transition-colors ${
              activeTab === 'preview'
                ? 'text-primary-600 border-t-2 border-primary-600 bg-primary-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText size={18} />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('coverLetter')}
            className={`flex-1 py-3 px-6 flex items-center justify-center gap-2 font-medium text-sm transition-colors ${
              activeTab === 'coverLetter'
                ? 'text-purple-600 border-t-2 border-purple-600 bg-purple-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Mail size={18} />
            Cover Letter
          </button>
        </nav>
      </div>
    </ResumeProvider>
  );
}

export default App;
