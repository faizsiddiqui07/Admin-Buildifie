import React, { useContext } from 'react';
import profile from '../../assets/profile.png';
import storeContext from '../../context/storeContext';

const Header = () => {
  const { store } = useContext(storeContext);

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="max-w-full mx-auto px-4 py-3 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-[300px] border border-gray-300 rounded-md px-3 py-2 focus:border-green-500 focus:outline-none"
        />
        <div className="ml-4 flex items-center gap-2">
          <div className="text-sm text-right hidden sm:block">
            <div>{store.userInfo?.name}</div>
            <div className="text-gray-500">{store.userInfo?.role}</div>
          </div>
          <img src={profile} alt="profile" className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Header;
