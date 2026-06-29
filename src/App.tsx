import { useState } from 'react';
import { ResumeProvider } from './store/ResumeContext';
import EditorPanel from './components/Editor/EditorPanel';
import PreviewPanel from './components/Preview/PreviewPanel';
import CoverLetterPanel from './components/CoverLetter/CoverLetterPanel';
import AppTabNav, { type AppTab } from './components/AppTabNav';

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('resume');

  return (
    <ResumeProvider>
      <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
        <AppTabNav activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 min-h-0 overflow-hidden">
          {activeTab === 'resume' && (
            <div className="h-full flex flex-col lg:flex-row min-h-0">
              <div className="flex-[3] min-h-0 overflow-hidden lg:min-w-0">
                <PreviewPanel />
              </div>
              <div className="flex-[2] min-h-0 overflow-y-auto bg-white lg:border-l border-gray-200 lg:min-w-0">
                <EditorPanel />
              </div>
            </div>
          )}
          {activeTab === 'coverLetter' && <CoverLetterPanel />}
        </main>
      </div>
    </ResumeProvider>
  );
}

export default App;
