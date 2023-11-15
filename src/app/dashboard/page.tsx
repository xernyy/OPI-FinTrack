// pages/dashboard/page.tsx
"use client";

import React from 'react';
import SideNavbar from './components/sideNavbar';
import ProjectSection from './components/projectSection';
import CompanyOverviewSection from './components/overviewSection';

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar*/
      <SideNavbar /> }

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto">
        <div className="m-8">
          {/* Sections for different parts of the dashboard */}
          <CompanyOverviewSection />
          <ProjectSection />
          {/* More sections can be added as needed */}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
