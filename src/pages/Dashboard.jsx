import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, TrendingUp, Clock, BarChart2 } from 'lucide-react'
import useProjectStore from '../store/projectStore'

const Dashboard = () => {
  const { projects } = useProjectStore()
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCtas: 0,
    recentProjects: [],
    ctaTypes: { button: 0, banner: 0 }
  })
  
  // Calculate dashboard stats
  useEffect(() => {
    const totalCtas = projects.reduce((sum, project) => sum + project.ctas.length, 0)
    
    const ctaTypes = projects.reduce((types, project) => {
      project.ctas.forEach(cta => {
        types[cta.type] = (types[cta.type] || 0) + 1
      })
      return types
    }, {})
    
    const recentProjects = [...projects]
      .sort((a, b) => new Date(b.updated) - new Date(a.updated))
      .slice(0, 3)
    
    setStats({
      totalProjects: projects.length,
      totalCtas,
      recentProjects,
      ctaTypes
    })
  }, [projects])
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/projects" className="btn btn-primary flex items-center gap-2">
          <PlusCircle size={18} />
          New Project
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Projects</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalProjects}</h3>
            </div>
            <div className="p-3 bg-primary-50 rounded-full text-primary-600">
              <FolderIcon />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <span className="text-green-500 font-medium">+{Math.max(1, Math.floor(stats.totalProjects * 0.2))} new</span> this month
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total CTAs</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalCtas}</h3>
            </div>
            <div className="p-3 bg-secondary-50 rounded-full text-secondary-600">
              <TargetIcon />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <span className="text-green-500 font-medium">+{Math.max(1, Math.floor(stats.totalCtas * 0.15))} new</span> this month
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">12.8%</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-green-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <span className="text-green-500 font-medium">+2.3%</span> from last month
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
            <Link to="/projects" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all
            </Link>
          </div>
          
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTAs</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.recentProjects.map(project => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                            <img 
                              src={project.thumbnail} 
                              alt={project.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{project.name}</p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">{project.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.ctas.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(project.updated)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/editor/${project.id}`} className="text-primary-600 hover:text-primary-900 mr-3">
                          Edit
                        </Link>
                        <Link to={`/preview/${project.id}`} className="text-secondary-600 hover:text-secondary-900">
                          Preview
                        </Link>
                      </td>
                    </tr>
                  ))}
                  
                  {stats.recentProjects.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                        No projects yet. Create your first project!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* CTA Analytics */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">CTA Analytics</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              <Clock size={14} />
              Last 30 days
            </button>
          </div>
          
          <div className="card p-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">CTA Types</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">Buttons</span>
                    <span>{stats.ctaTypes.button || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full" 
                      style={{ 
                        width: `${stats.totalCtas ? (stats.ctaTypes.button || 0) / stats.totalCtas * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">Banners</span>
                    <span>{stats.ctaTypes.banner || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-secondary-600 h-2 rounded-full" 
                      style={{ 
                        width: `${stats.totalCtas ? (stats.ctaTypes.banner || 0) / stats.totalCtas * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Conversion Performance</h3>
              <div className="h-48 flex items-end justify-between">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const height = 30 + Math.random() * 70;
                  return (
                    <div key={day} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-primary-100 rounded-t"
                        style={{ height: `${height}%` }}
                      >
                        <div 
                          className="w-full bg-primary-500 rounded-t"
                          style={{ height: `${height * 0.7}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Link to="/projects" className="btn btn-outline w-full flex items-center justify-center gap-2">
                <BarChart2 size={16} />
                View Detailed Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Icons
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
)

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
)

export default Dashboard
