import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import SideNavbar from '../sideNavbar';
import ProjectSection from './projectSection';
import CompanyOverviewSection from './overviewSection';
import NewProjectModal from './newProjectModal';


const DashboardPage = ({ companyData, error }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const closeModal = () => {
    setIsNewProjectModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="z-10">
        <SideNavbar />
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="m-8">
          {error && <div className="text-red-500">Error: {error.message}</div>}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <CompanyOverviewSection />
              <ProjectSection />
            </>
          )}

          {/* Floating Action Button */}
          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="fixed right-8 bottom-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            aria-label="New Project"
          >
            <FaPlusCircle size={24} />
          </button>

          {/* Render the NewProjectModal if it's open */}
          {isNewProjectModalOpen && (
            <div className="fixed inset-0 z-20">
              <NewProjectModal onClose={closeModal} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
