import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Plus, Save, ArrowLeft } from 'lucide-react'
import VideoPlayer from '../components/VideoPlayer'
import Timeline from '../components/Timeline'
import CtaEditor from '../components/CtaEditor'
import useProjectStore from '../store/projectStore'

const Editor = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { projects, setCurrentProject, currentProject, updateProject, addCta, updateCta, deleteCta } = useProjectStore()
  
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedCtaId, setSelectedCtaId] = useState(null)
  const [showCtaEditor, setShowCtaEditor] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
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
  
  // Get selected CTA
  const selectedCta = currentProject?.ctas.find(cta => cta.id === selectedCtaId)
  
  // Handle video time update
  const handleTimeUpdate = (time) => {
    setCurrentTime(time)
  }
  
  // Handle video duration update
  const handleDurationChange = (duration) => {
    setDuration(duration)
  }
  
  // Handle CTA selection
  const handleCtaSelect = (ctaId) => {
    setSelectedCtaId(ctaId)
    setShowCtaEditor(true)
  }
  
  // Handle CTA position change
  const handleCtaPositionChange = (ctaId, position) => {
    updateCta(projectId, ctaId, { position })
  }
  
  // Handle CTA update
  const handleCtaUpdate = (ctaData) => {
    if (selectedCtaId) {
      updateCta(projectId, selectedCtaId, ctaData)
    } else {
      const newCtaId = addCta(projectId, ctaData)
      setSelectedCtaId(newCtaId)
    }
    setShowCtaEditor(false)
  }
  
  // Handle CTA deletion
  const handleCtaDelete = () => {
    if (selectedCtaId) {
      deleteCta(projectId, selectedCtaId)
      setSelectedCtaId(null)
      setShowCtaEditor(false)
    }
  }
  
  // Handle project name update
  const handleNameChange = (e) => {
    updateProject(projectId, { name: e.target.value })
  }
  
  // Handle preview navigation
  const handlePreview = () => {
    navigate(`/preview/${projectId}`)
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
            <input
              type="text"
              className="text-xl font-semibold text-gray-900 border-none focus:ring-0 focus:outline-none bg-transparent"
              value={currentProject.name}
              onChange={handleNameChange}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="btn btn-outline flex items-center gap-2"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Exit Edit Mode' : 'Edit Mode'}
            </button>
            
            <button 
              className="btn btn-outline flex items-center gap-2"
              onClick={() => {
                setSelectedCtaId(null)
                setShowCtaEditor(true)
              }}
            >
              <Plus size={18} />
              Add CTA
            </button>
            
            <button 
              className="btn btn-primary flex items-center gap-2"
              onClick={handlePreview}
            >
              <Play size={18} />
              Preview
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video preview */}
          <div className="lg:col-span-2">
            <VideoPlayer 
              videoUrl={currentProject.videoUrl}
              ctas={currentProject.ctas}
              isEditing={isEditing}
              onCtaClick={(cta) => window.open(cta.link, '_blank')}
              onCtaPositionChange={handleCtaPositionChange}
              onProgress={handleTimeUpdate}
              onDuration={handleDurationChange}
            />
            
            <div className="mt-4">
              <Timeline 
                duration={duration}
                currentTime={currentTime}
                ctas={currentProject.ctas}
                onSeek={handleTimeUpdate}
                onCtaSelect={handleCtaSelect}
                selectedCtaId={selectedCtaId}
              />
            </div>
          </div>
          
          {/* CTA editor panel */}
          <div className="lg:col-span-1">
            <AnimatePresence>
              {showCtaEditor ? (
                <CtaEditor 
                  cta={selectedCta}
                  onUpdate={handleCtaUpdate}
                  onDelete={handleCtaDelete}
                  onClose={() => setShowCtaEditor(false)}
                />
              ) : (
                <motion.div
                  className="bg-white rounded-lg shadow-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">CTA Overview</h3>
                  
                  {currentProject.ctas.length > 0 ? (
                    <div className="space-y-3">
                      {currentProject.ctas.map(cta => (
                        <div 
                          key={cta.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedCtaId === cta.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleCtaSelect(cta.id)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{cta.text}</span>
                            <span className="text-xs text-gray-500">{cta.type}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>
                              {Math.floor(cta.startTime)}s - {Math.floor(cta.endTime)}s
                            </span>
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: cta.style.backgroundColor }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                        <Plus size={24} className="text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-4">No CTAs added yet</p>
                      <button 
                        className="btn btn-primary"
                        onClick={() => {
                          setSelectedCtaId(null)
                          setShowCtaEditor(true)
                        }}
                      >
                        Add Your First CTA
                      </button>
                    </div>
                  )}
                  
                  {currentProject.ctas.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <button 
                        className="btn btn-outline w-full flex items-center justify-center gap-2"
                        onClick={() => {
                          setSelectedCtaId(null)
                          setShowCtaEditor(true)
                        }}
                      >
                        <Plus size={16} />
                        Add New CTA
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
