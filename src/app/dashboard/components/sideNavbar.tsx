// SideNavbar.tsx
import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineTeam, AiOutlineSetting, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';

const SideNavbar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex">
      <aside className={`bg-white fixed h-full transition-width duration-300 ease-in-out z-30 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <button onClick={toggleNavbar} className="p-4">
              <AiOutlineMenu className="text-3xl" />
            </button>
            {!isCollapsed && (
            <nav className="mt-4">
              <Link href="/projects">
                <div className="flex items-center space-x-2 p-4 text-gray-700 hover:bg-gray-200 rounded transition duration-150 cursor-pointer">
                  <AiOutlineHome className="text-2xl" />
                  <span>Projects</span>
                </div>
              </Link>
              <Link href="/teams">
                <div className="flex items-center space-x-2 p-4 text-gray-700 hover:bg-gray-200 rounded transition duration-150 cursor-pointer">
                  <AiOutlineTeam className="text-2xl" />
                  <span>Teams</span>
                </div>
              </Link>
              <Link href="/settings">
                <div className="flex items-center space-x-2 p-4 text-gray-700 hover:bg-gray-200 rounded transition duration-150 cursor-pointer">
                  <AiOutlineSetting className="text-2xl" />
                  <span>Settings</span>
                </div>
              </Link>
            </nav>
            )}
          </div>
          {!isCollapsed && (
            <div className="p-4 border-t">
              <span>Company Name</span>
            </div>
          )}
        </div>
      </aside>
      <div className={`flex-1 transition-margin duration-300 ease-in-out ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* The rest of the content that gets pushed over when the sidebar expands goes here */}
      </div>
    </div>
  );
};

export default SideNavbar;
