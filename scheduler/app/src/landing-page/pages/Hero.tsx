import React from 'react';
import People from '../components/People';

// Fake profile
const profile = {
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "A short bio about John Doe. He is a software engineer with a passion for building web applications.",
  avatarUrl: "https://via.placeholder.com/150", // Replace with college logo
  college: "University of California, Berkeley" // Replace with college name
};

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row pt-14 w-full">
      {/* Left Column: Profile Section */}
      <div className="w-full lg:w-[40%] p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <img
              className="w-24 h-24 rounded-full"
              src={profile.avatarUrl}
              alt={`${profile.name}'s avatar`}
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
              <p className="text-gray-600 dark:text-gray-300">{profile.college}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Right Column: People */}
      <div className="w-full lg:w-[60%] p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <People />
        </div>
      </div>
    </div>
  );
}
