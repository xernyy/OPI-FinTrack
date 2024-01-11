"use client";

// components/SignUp.tsx
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '@/app/supabaseClient';
import Modal from '../components/Modal';
import CreateCompany from '../components/signupflow/createCompany';
import JoinCompany from '../components/signupflow/joinCompany';
import { FaSignInAlt } from 'react-icons/fa';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database }  from '@/types/database.types'
import { useRouter } from 'next/navigation';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  jobTitle: string;
  phone: string;
}

const signUpSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
                     .oneOf([yup.ref('password')], 'Passwords must match')
                     .required('Confirm Password is required'),
  country: yup.string().required('Country is required'),
  jobTitle: yup.string().required('Job title is required'),
  phone: yup.string().required('Phone number is required'),
});


const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({ resolver: yupResolver(signUpSchema) });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const router = useRouter()
  const supabaseClient = createClientComponentClient<Database>()

  useEffect(() => {
  // Function to fetch and sort countries
  const fetchAndSortCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      const countryNames = data.map((country: { name: { common: any; }; }) => country.name.common).sort();
      setCountries(countryNames);

      // Cache the sorted countries in local storage with a timestamp
      localStorage.setItem('countries', JSON.stringify(countryNames));
      localStorage.setItem('countriesCacheTime', Date.now().toString());
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Check if countries are cached and not expired (e.g., 24 hours)
  const cachedCountries = localStorage.getItem('countries');
  const cacheTime = localStorage.getItem('countriesCacheTime');
  const isCacheValid = cacheTime && (Date.now() - parseInt(cacheTime) < 24 * 60 * 60 * 1000);

  if (cachedCountries && isCacheValid) {
    const sortedCountries = JSON.parse(cachedCountries).sort();
    setCountries(sortedCountries);
  } else {
    fetchAndSortCountries();
  }
}, []);

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const response = await supabaseClient.auth.signUp({ email: data.email, 
      password: data.password 
     ,options: {
      emailRedirectTo: `${location.origin}/api/auth/callback`,
    },}
      );

    if (response.error) {
      console.error('Error in sign-up:', response.error);
      return;
    }
    const user = response.data.user
    if(user){
    const { error: profileError } = await supabase.from('profile').insert([{
      id: user.id,
      first_name: data.firstName,
      last_name: data.lastName,
      country: data.country,
      job_title: data.jobTitle,
      phone: data.phone,
    }]);
    
    if (profileError) {
      console.error('Error creating user profile:', profileError);
    } else {
      setIsModalOpen(true);
    }
  }
  router.refresh()
  };

  const renderModalContent = () => {
    return showCreateCompany ? <CreateCompany /> : <JoinCompany />;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-6 mt-4 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  {/* First Name Field */}
  <div>
    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
    <input id="firstName" {...register('firstName')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>}
  </div>

  {/* Last Name Field */}
  <div>
    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
    <input id="lastName" {...register('lastName')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>}
  </div>

   {/* Country Field */}
   <div>
    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
    <select id="country" {...register('country')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
      <option value="">Select Country</option>
      {/* Map through countries array to render options */}
      {countries.map((country, index) => (
        <option key={index} value={country}>{country}</option>
      ))}
    </select>
    {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country.message}</p>}
  </div>

  {/* Job Title Field */}
  <div>
    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
    <input id="jobTitle" {...register('jobTitle')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    {errors.jobTitle && <p className="mt-2 text-sm text-red-600">{errors.jobTitle.message}</p>}
  </div>

  {/* Phone Field */}
  <div>
    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
    <input id="phone" type="tel" {...register('phone')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
  </div>

  {/* Email Field */}
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <input id="email" type="email" {...register('email')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
  </div>

  {/* Password Field */}
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
    <input id="password" type="password" {...register('password')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
  </div>

  {/* Confirm Password Field */}
  <div>
    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
    <input id="confirmPassword" type="password" {...register('confirmPassword')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
  </div>
  
      {/* Submit Button */}
<button type="submit" className="w-full px-4 py-2 text-lg text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center justify-center">
  <FaSignInAlt className="mr-2" />
  Sign Up
</button>
</form>
</div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {!showCreateCompany && (
          <div className="p-4 text-center">
            <h3 className="text-xl font-semibold">Choose Your Next Step</h3>
            <div className="mt-4 space-y-3">
              <button onClick={() => setShowCreateCompany(true)} className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Create Company</button>
            </div>
          </div>
        )}
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default SignUp;