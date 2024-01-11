import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import DeleteConfirmationModal from '../deleteConfirmationModal';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface TransactionData {
  amount?: number | null
  categories?: string | null
  client_id?: string | null
  date?: string | null
  description?: string | null
  invoice_number?: string | null
  project_id: string
  status?: string | null
  subcontractor_id?: string | null
  transaction_id?: number
  transaction_type?: string | null
  subcontractorName?: string; // Additional property for display
}

interface SubcontractorData {
  name: string;
  subcontractor_id: string;
}

interface TransactionHistoryProps {
  projectId: string;
}
const supabase = createClientComponentClient();
const TransactionHistory: React.FC<TransactionHistoryProps> = ({ projectId }) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [transactionToDelete, setTransactionToDelete] = useState<TransactionData | null>(null);
  
  const openDeleteModal = (transaction: TransactionData) => {
    setTransactionToDelete(transaction);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    if (transactionToDelete) {
      const { error } = await supabase.from('transactions').delete().match({ transaction_id: transactionToDelete.transaction_id });
      if (error) {
        console.error('Error deleting transaction:', error);
      } else {
        setTransactions(transactions.filter(t => t.transaction_id !== transactionToDelete.transaction_id));
      }
    }
    setIsDeleteModalOpen(false);
  };

  const fetchSubcontractorNames = async (subcontractorIds: string[]) => {
    const { data, error } = await supabase
      .from('subcontractors')
      .select('name, subcontractor_id')
      .in('subcontractor_id', subcontractorIds);

    if (error) {
      console.error('Error fetching subcontractors:', error);
      return {};
    }

    return data.reduce((acc, curr) => {
      acc[curr.subcontractor_id] = curr.name;
      return acc;
    }, {} as Record<string, string>);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data: transactionData, error: transactionError } = await supabase
          .from('transactions')
          .select('*')
          .eq('project_id', projectId);
  
        if (transactionError) throw transactionError;
  
        // Extract unique subcontractor IDs and filter out null values
        const subcontractorIds = Array.from(new Set(
          transactionData
            .map(t => t.subcontractor_id)
            .filter((id): id is string => id !== null)
        ));
  
        // Fetch subcontractor names in one go
        const subcontractorNames = await fetchSubcontractorNames(subcontractorIds);
  
        // Map over transactions to include subcontractor names
        const transactionsWithNames = transactionData.map(transaction => ({
          ...transaction,
          subcontractorName: transaction.subcontractor_id ? subcontractorNames[transaction.subcontractor_id] : 'Unknown'
        }));
  
        setTransactions(transactionsWithNames);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, [projectId]);



  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error loading transactions: {error}</div>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Invoice Number</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Subcontractor</th>
              <th scope="col" className="px-6 py-3">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-4">{transaction.invoice_number}</td>
                <td className="px-6 py-4">${transaction.amount}</td>
                <td className="px-6 py-4">{transaction.date}</td>
                <td className="px-6 py-4">{transaction.transaction_type}</td>
                <td className="px-6 py-4">{transaction.categories || 'Uncategorized'}</td>
                <td className="px-6 py-4">{transaction.subcontractorName}</td>
                <td className="px-6 py-4">{transaction.description || 'N/A'}</td>
                <td className="px-6 py-4 text-right">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    openDeleteModal(transaction);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrashAlt /> {/* Ensure you have react-icons imported */}
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDeleteModalOpen && (
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this transaction?"
      />
    )}
      {transactions.length === 0 && !loading && <div>No transactions found.</div>}
    </div>
  );
};

export default TransactionHistory;
