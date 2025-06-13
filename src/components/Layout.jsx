import { Outlet, NavLink } from 'react-router-dom'
import { Home, FolderOpen, Settings, HelpCircle, LogOut } from 'lucide-react'

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-16 md:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-center md:justify-start">
          <div className="h-8 w-8 rounded-md bg-primary-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <h1 className="ml-3 text-xl font-bold text-gray-900 hidden md:block">CTA Toolkit</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/" className={({isActive}) => 
            `flex items-center p-2 rounded-md transition-colors ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`
          }>
            <Home className="h-5 w-5" />
            <span className="ml-3 hidden md:block">Dashboard</span>
          </NavLink>
          
          <NavLink to="/projects" className={({isActive}) => 
            `flex items-center p-2 rounded-md transition-colors ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`
          }>
            <FolderOpen className="h-5 w-5" />
            <span className="ml-3 hidden md:block">Projects</span>
          </NavLink>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <button className="flex items-center w-full p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
              <Settings className="h-5 w-5" />
              <span className="ml-3 hidden md:block">Settings</span>
            </button>
            
            <button className="flex items-center w-full p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
              <HelpCircle className="h-5 w-5" />
              <span className="ml-3 hidden md:block">Help</span>
            </button>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center w-full p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            <LogOut className="h-5 w-5" />
            <span className="ml-3 hidden md:block">Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
