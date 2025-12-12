
import React, { useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { useAuth } from './DemoAuth'

export default function Login() {
  const [user, setUser] = useState({name:'',password:''})
  const [error, seterror] = useState('')
  const {Login,Error}=useAuth()
 
    const handleValidate = () => {
    if (user.name.trim().length !== 0 ) {
      seterror("");
    } else {
      seterror("Email cannot be empty");
    }

  console.log("Length:", user.name.trim().length);
};

  const   handleSubmit  =()=>{
      Login(user.name,user.password)
 
    
    setUser({name:'',
      password:''
    })
  }

  return (
    <div>
      <div className="w-screen flex items-center justify-center h-screen bg-zinc-700 text-white">
          <div className="container flex relative flex-col w-88 h-112 rounded border p-8  shadow     ">
            <div className="emailField flex flex-col gap-1.5  justify-center ">
              <span className="text-md ml-2.5 ">
                Email:
              </span>
              <input  onBlur={handleValidate} type="text" value={user.name} onChange={(e)=>setUser({name:e.target.value,password:user.password})} placeholder='Enter your email' className='w-full outline-none border-white/50 border shadow-gray-600 shadow-inner focus:border focus:border-blue-600 rounded-xl h-12 pr-8 pl-2.5'  />
              {
                error&&(

                  <div className="err font-medium text-md text-red-600 ">{error}</div>
                )
              }
            </div>
            <div className="passwordField mt-4 flex flex-col relative  gap-1.5  justify-center ">
              <span className="text-md ml-2.5 ">
                Password:
              </span>
              <div className="password  w-full h-12 flex items-center ">

                <input   type="password" value={user.password} onChange={(e)=>{setUser({name:user.name,password:e.target.value})}}  placeholder='Enter your Password' className='w-full outline-none border-white/50 border shadow-gray-600 shadow-inner focus:border focus:border-blue-600 rounded-xl h-full pl-2.5 pr-8  '  />
                <div className="eye flex items-center justify-center border">

                  <BsEye size={18} className='absolute hover:text-white/75 active:scale-95 transition-all right-2.5  ' />
                </div>
              </div>
            </div>
            {Error&&(
              <div className="text-2x">{Error}</div>
            )}

            {/* Submit Btn  */}
            <div  className="sbtn w-full h-12 absolute left-0  px-4 right-0 bottom-5 b-blue-500 rounded-xl  ">
              <button onClick={handleSubmit} className='w-full h-full  text-white text-md shadow- active:scale-95 transition hover:bg-blue-500/70 shadow-zinc-600 font-semibold bg-blue-500 rounded-xl ' >Submit</button>
            </div>
          </div>
      </div>
    </div>
  )
}
