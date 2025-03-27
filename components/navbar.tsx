'use client';
import { useState } from 'react';
import Image from 'next/image';
import { signOut } from '@/auth';

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // 这里可以添加实际的登出逻辑，比如清除 token 等
      signOut();
    } catch (error) {
      console.error('登出失败:', error);
    }
  };

  return (
    <div className="navbar max-w-[100rem] mx-auto bg-base-100 shadow-md rounded-b-lg fixed top-0 left-0 right-0 z-50 px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold text-primary">ChargeBao</a>
      </div>
      <div className="dropdown dropdown-end">
        <div 
          tabIndex={0} 
          role="button" 
          className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image 
              alt="用户头像" 
              src="/images/avatar.png"
              className="object-cover"
              width={40}
              height={40}
            />
          </div>
        </div>
        <ul 
          tabIndex={0} 
          className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-lg ${
            isDropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <a className="text-error hover:bg-error/10" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11 4.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L11.586 7H6a1 1 0 1 1 0-2h5.586L8.293 1.707a1 1 0 0 1 1.414-1.414L14 4.586v2.828z" clipRule="evenodd" />
              </svg>
              退出登录
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
