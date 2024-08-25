import React from 'react';
import Calendar from '../components/Calendar'; // Import the Calendar component
import { useAuth } from 'wasp/client/auth';

// Fake profile
const profile = {
  bio: "A small description of what can the university help with if you book a session",
  avatarUrl: "https://via.placeholder.com/150", // Replace with college logo
  college: "University of California, Berkeley" // Replace with college name
};

export default function Dashboard() {
  const { data: user } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row pt-12 w-full">
      {/* Left Column: Profile Section */}
      <div className="w-full lg:w-[40%] p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <img
              className="w-24 h-24 rounded-full"
              src={profile.avatarUrl}
            />
            <div className="ml-4">
              <p className="text-gray-600 font-bold dark:text-gray-300">{profile.college}</p>
            </div>
          </div>
              <div className='py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500 dark:text-white'>Email address</dt>
                <dd className='mt-1 text-sm text-gray-900 dark:text-gray-400 sm:col-span-2 sm:mt-0'>{user?.about}</dd>
              </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Right Column: Calendar */}
      <div className="w-full lg:w-[70%] p-6">
        <Calendar />
      </div>
    </div>
  );
}
