
import React from 'react'
import { BiHome, BiMessage, BiNotification, BiUserCircle } from 'react-icons/bi'
import { BsCompass } from 'react-icons/bs'


import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    const navLink = [
        {
            name: 'Home',
            isActive: false,
            action: '',
            icon: <BiHome size={24} />,
            path:'/'
        },

        {
            name: 'Explore',
            isActive: true,
            action: '',
            icon: <BsCompass size={24} />,
            path:'/explore'


        },
        {
            name: 'Notification',
            isActive: false,
            action: '',
            icon: <BiNotification size={24} />,
            count: 1,
            path:'/notification'


        },
        {
            name: 'Message',
            isActive: false,
            action: '',
            icon: <BiMessage size={24} />,
            count: 2,
            path:'/message'

            
            
        },
        {
            name: 'Profile',
            isActive: false,
            action: '',
            icon: <BiUserCircle size={24} />,
            path:'/profile'


        }

    ]
    return (
        <div className='w-[20rem] bg-[#251C2D]   lg:flex  hidden  flex-col  rounded-lg shadow md:p-4 h-[80%]' >
            <div className="title flex ">
                <div className="logo w-12 h-12  rounded-full text-white text-center flex items-center justify-center bg-[#496BF4] font-bold text-xl ">N</div>
                <div className="name flex justify-center  gap- leading-5 px-3 flex-col">
                    <div className="logo_name text-white font-semibold text-lg ">GsnX</div>
                    <div className="user_name text-gray-400 text-sm ">@Nibesh</div>
                </div>
                {/* Action Btn  */}
            </div>
            <div className="action_btn  mt-6  flex-1  ">
                {
                    navLink.map((itm,key) => (
                        <SBtn key={key} name={itm.name} icon={itm.icon} path={itm.path} msg_count={itm.count || 0} isActive={itm.isActive} />
                    ))
                }
            </div>

            {/* Footer  */}
            <div className="footer   w-full h-12 ">
                <button className='w-full h-12  rounded-2xl font-mono text-white bg-purple-600 shadow transition-all shadow-purple-600 active:scale-95 hover:bg-purple-600/90' >Add Post</button>
            </div>
        </div>
    )
}



function SBtn({ name, icon, msg_count, path }) {
  return (
    <div className="home_btn mb-1.5">
      <NavLink
        to={path}
        className={({ isActive }) =>
          `w-full h-12 rounded-3xl p-4 active:scale-95 transition-all gap-4 
           relative flex items-center text-white font-semibold
           ${isActive ? "bg-[#302839]" : ""} hover:bg-[#4e415ef5]  `
        }
      >
        <div className="icn">{icon}</div>

        {name}

        {Number(msg_count) > 0 && (
          <div className="absolute msg_count right-2 w-6 h-6 bg-red-400/80 rounded-full text-[12px]
          text-center flex items-center justify-center font-bold">
            {msg_count}
          </div>
        )}
      </NavLink>
    </div>
  );
}

