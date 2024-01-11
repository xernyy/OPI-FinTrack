// pages/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import ProjectHeader from '@/app/components/projectComponents/projectHeader';
import FinancialDashboard from '@/app/components/projectComponents/FinancialDashboard';
import TransactionHistory from '@/app/components/projectComponents/TransactionHistory';
import ActionModal from '@/app/components/projectComponents/ActionModal';
import PaymentRecording from '@/app/components/projectComponents/PaymentRecording';
import AdditionalCosts from '@/app/components/projectComponents/AdditionalCosts';
import SideNavbar from '@/app/components/sideNavbar';
import { FaBars } from 'react-icons/fa';

const ProjectPage = ({ params }: { params: { project_id: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAdditionalCostsModal, setShowAdditionalCostsModal] = useState(false);

  useEffect(() => {
    if (params.project_id) {
      setIsLoading(false);
    } else {
      setError('Project ID not found.');
    }
  }, [params]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center">Error: {error}</div>;
  }

  const handleAddPayment = () => setShowPaymentModal(true);
  const handleAddChangeOrder = () => setShowAdditionalCostsModal(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="z-10">
        <SideNavbar />
      </div>
      <main className="flex-1 overflow-y-auto p-8">
        <ProjectHeader projectId={params.project_id}/>
        <FinancialDashboard projectId={params.project_id}/>
        <TransactionHistory projectId={params.project_id}/>

        <button 
          className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <FaBars className="text-xl" />
        </button>

        {isModalOpen && <ActionModal 
          onClose={() => setIsModalOpen(false)}
          onRecordPayment={handleAddPayment}
          onAddChangeOrder={handleAddChangeOrder}
          onGenerateReport={() => {
            // Placeholder or implement functionality
          }}
          onAddDailyReport={() => {
            // Placeholder or implement functionality
          }}
          onEditProjectDetails={() => {
            // Placeholder or implement functionality
          }}
          isOpen={isModalOpen}  // Only one 'isOpen' attribute should be here
        />}
        {showPaymentModal && (
        <PaymentRecording 
        projectId={params.project_id} 
        onClose={() => setShowPaymentModal(false)} 
        />
)}


        {showAdditionalCostsModal && <AdditionalCosts 
          projectId={params.project_id} 
          onClose={() => setShowAdditionalCostsModal(false)} 
        />}
      </main>
    </div>
  );
};

export default ProjectPage;
