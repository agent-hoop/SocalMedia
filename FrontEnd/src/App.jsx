import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import WhoFollow from './components/WhoFollow';

function App() {

  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <>
      <div className="h-screen w-screen lg:p-4 lg:gap-6 bg-zinc-800 flex ">
        <div className="sideBar  ">
          <Sidebar/>
        </div>
        <Outlet/>

        <div className="rightPanwl">
          {isHome&&(
            <>
              {/* Who To follow  */}
              <div className="mt-14 ml-2  lg:ml-0  lg:mt-0">

                <WhoFollow/>
              </div>
            </>
          )}
        </div>
        
      </div>
    </>
  )
}

export default App
