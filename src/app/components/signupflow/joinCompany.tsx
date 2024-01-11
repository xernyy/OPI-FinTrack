// components/JoinCompany.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/app/supabaseClient';
import { useRouter } from 'next/router';

interface FormData {
  companyCode: string;
}

const JoinCompany: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage('');

    try {
      const { data: company, error } = await supabase
        .from('companies')
        .select('*')
        .eq('credentials', data.companyCode)
        .single();

      if (error || !company) {
        setMessage('Company not found or invalid code.');
        setLoading(false);
        return;
      }

    //   const user = supabase.auth.user();
    //   if (user) {
    //       const { error: updateError } = await supabase
    //           .from('profile')
    //           .update({ company_id: company.company_id })
    //           .eq('id', user.id);

    //       if (updateError) {
    //           console.error('Error updating user profile:', updateError);
    //           setMessage('Error updating profile.');
    //       } else {
    //           setMessage('Successfully joined the company! Awaiting approval.');
    //           // You can add logic to redirect or notify the company admin for approval
    //       }
    //   }
  } catch (error) {
      console.error('Error joining company:', error);
      setMessage('Error joining company.');
  } finally {
      setLoading(false);
  }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto shadow-lg rounded-lg p-4 bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Join a Company</h2>

        <div className="mb-4">
          <label htmlFor="company-code" className="block text-gray-700 text-sm font-bold mb-2">
            Company Code
          </label>
          <input
            {...register('companyCode', { required: 'Company code is required' })}
            id="company-code"
            type="text"
            placeholder="Enter company code"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.companyCode && <p className="text-red-500 text-xs italic">{errors.companyCode.message}</p>}
        </div>

        <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {loading ? 'Joining...' : 'Join Company'}
        </button>

        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default JoinCompany;
