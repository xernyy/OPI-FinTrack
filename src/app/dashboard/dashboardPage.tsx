'use client';
import React, { useEffect, useState } from 'react';
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FaPlusCircle } from 'react-icons/fa';
import SideNavbar from '../components/sideNavbar';
import ProjectSection from '../components/dashboardComponent/projectSection';
import CompanyOverviewSection from '../components/dashboardComponent/overviewSection';
import NewProjectModal from '../components/dashboardComponent/newProjectModal';
import type { Database } from '@/types/database.types';

export default function DashboardPage({ user }: { user: User | null }) {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          setLoading(true);

          const { data: profile, error } = await supabase
            .from('profile')
            .select('company_id')
            .eq('id', user.id)
            .single();

          if (error) {
            throw error;
          }

          setCompanyId(profile?.company_id || null);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user, supabase]);

  const closeModal = (): void => setIsNewProjectModalOpen(false);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="z-10">
        <SideNavbar />
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="m-8">
          <CompanyOverviewSection companyId={companyId} />
          <ProjectSection companyId={companyId} />

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
              <NewProjectModal onClose={closeModal} companyId={companyId} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
