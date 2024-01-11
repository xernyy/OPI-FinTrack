import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const supabase = createClientComponentClient<Database>();

interface Company {
  
  name: string;
  address: string;
  industry: string;
  size: number;
}



const schema = yup.object().shape({
  name: yup.string().required('Company name is required'),
  address: yup.string().required('Address is required'),
  industry: yup.string().required('Industry is required'),
  size: yup.number().positive('Size must be a positive number').integer('Size must be an integer').required('Size is required'),
});

const CreateCompany: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Company>
  ({ resolver: yupResolver(schema) });
  const [uploading, setUploading] = useState(false);
  const router= useRouter()

  const onSubmit: SubmitHandler<Company> = async (data) => {
    setUploading(true);

    try {
      const newCompanyId = uuidv4();  // Generate a UUID for company_id
      const newCredentials = uuidv4();  // Generate a UUID for credentials

      const companyDataWithIds = { ...data, company_id: newCompanyId, credentials: newCredentials };

      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert([companyDataWithIds])
        .single();


      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('User not found');
      }

      const { error: profileError } = await supabase
        .from('profile')
        .update({ company_id: newCompanyId })
        .eq('id', user.id);

      if (profileError) {
        throw new Error(profileError.message);
      }

      toast.success('Company created successfully!');
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Company</h2>
 
        {/* Company Name Field */}
        <div className="mb-4">
          <label htmlFor="company-name" className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
          <input {...register('name')} id="company-name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label htmlFor="company-address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <input {...register('address')} id="company-address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <p className="text-red-500 text-xs italic">{errors.address?.message}</p>
        </div>

        {/* Industry Field */}
        <div className="mb-4">
          <label htmlFor="company-industry" className="block text-gray-700 text-sm font-bold mb-2">Industry</label>
          <input {...register('industry')} id="company-industry" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <p className="text-red-500 text-xs italic">{errors.industry?.message}</p>
        </div>

        {/* Size Field */}
        <div className="mb-4">
          <label htmlFor="company-size" className="block text-gray-700 text-sm font-bold mb-2">Size</label>
          <input {...register('size')} type="number" id="company-size" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          <p className="text-red-500 text-xs italic">{errors.size?.message}</p>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={uploading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {uploading ? 'Creating...' : 'Create Company'}
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;
