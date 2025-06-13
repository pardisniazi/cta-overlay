import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Edit, ArrowLeft, ExternalLink } from 'lucide-react'
import VideoPlayer from '../components/VideoPlayer'
import useProjectStore from '../store/projectStore'

const Preview = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { projects, setCurrentProject, currentProject } = useProjectStore()
  const [clickedCtas, setClickedCtas] = useState([])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  
  // Load project data
  useEffect(() => {
    setCurrentProject(projectId)
  }, [projectId, setCurrentProject])
  
  // Handle navigation if project not found
  useEffect(() => {
    if (projects.length > 0 && !projects.find(p => p.id === projectId)) {
      navigate('/projects')
    }
  }, [projects, projectId, navigate])
  
  // Handle CTA click
  const handleCtaClick = (cta) => {
    setClickedCtas(prev => [...prev, cta.id])
    window.open(cta.link, '_blank')
  }
  
  // Handle video progress
  const handleProgress = (time) => {
    setCurrentTime(time)
  }
  
  // Handle video duration
  const handleDuration = (duration) => {
    setDuration(duration)
  }
  
  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => navigate('/projects')}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{currentProject.name}</h1>
          </div>
          
          <button 
            className="btn btn-outline flex items-center gap-2"
            onClick={() => navigate(`/editor/${projectId}`)}
          >
            <Edit size={18} />
            Edit Project
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <VideoPlayer 
              videoUrl={currentProject.videoUrl}
              ctas={currentProject.ctas}
              onCtaClick={handleCtaClick}
              onProgress={handleProgress}
              onDuration={handleDuration}
            />
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Affiliate Links</h2>
              
              {currentProject.ctas.length > 0 ? (
                <div className="space-y-3">
                  {currentProject.ctas.map(cta => {
                    const isClicked = clickedCtas.includes(cta.id)
                    const isActive = currentTime >= cta.startTime && currentTime <= cta.endTime
                    
                    return (
                      <div 
                        key={cta.id}
                        className={`p-4 border rounded-lg transition-all ${
                          isClicked ? 'border-green-500 bg-green-50' : 
                          isActive ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{cta.text}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Appears at {Math.floor(cta.startTime)}s - {Math.floor(cta.endTime)}s
                            </p>
                          </div>
                          <a 
                            href={cta.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 text-sm font-medium ${
                              isClicked ? 'text-green-600' : 'text-primary-600'
                            }`}
                          >
                            {isClicked ? 'Visited' : 'Visit Link'}
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No affiliate links available for this project.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
