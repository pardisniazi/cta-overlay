import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Upload, Link } from 'lucide-react'

const NewProjectModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    videoUrl: '',
    thumbnail: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }
  
  // Sample video URLs for quick selection
  const sampleVideos = [
    {
      name: 'Product Review - Fitness Watch',
      description: 'Review video with affiliate CTAs for fitness watch',
      videoUrl: 'https://www.pexels.com/video/woman-jogging-853889/download/',
      thumbnail: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: 'Cooking Tutorial - Kitchen Gadgets',
      description: 'Cooking tutorial with affiliate links to kitchen tools',
      videoUrl: 'https://www.pexels.com/video/person-cooking-food-in-a-pan-3209268/download/',
      thumbnail: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: 'Tech Review - Latest Smartphone',
      description: 'Detailed review of the latest smartphone with affiliate links',
      videoUrl: 'https://www.pexels.com/video/person-using-a-smartphone-5387525/download/',
      thumbnail: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]
  
  const handleSelectSample = (sample) => {
    setFormData(sample)
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create New Project</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter project name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input min-h-[80px]"
                  placeholder="Enter project description"
                  required
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Link size={16} />
                  Video URL
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter video URL"
                  required
                />
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Link size={16} />
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter thumbnail URL"
                  required
                />
                {formData.thumbnail && (
                  <div className="mt-2 rounded-md overflow-hidden w-32 h-20">
                    <img 
                      src={formData.thumbnail} 
                      alt="Thumbnail preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Or select a sample video:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sampleVideos.map((sample, index) => (
                  <div 
                    key={index}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      formData.videoUrl === sample.videoUrl ? 'ring-2 ring-primary-500' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSelectSample(sample)}
                  >
                    <div className="aspect-video bg-gray-100">
                      <img 
                        src={sample.thumbnail} 
                        alt={sample.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h4 className="text-xs font-medium text-gray-900 truncate">{sample.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="btn btn-outline"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!formData.name || !formData.videoUrl}
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default NewProjectModal
