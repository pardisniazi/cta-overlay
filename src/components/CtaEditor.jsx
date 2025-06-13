import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Move, Link, Clock, Type, Palette } from 'lucide-react'

const CtaEditor = ({ 
  cta, 
  onUpdate = () => {}, 
  onDelete = () => {},
  onClose = () => {}
}) => {
  const [formData, setFormData] = useState({
    type: 'button',
    text: '',
    position: { x: 50, y: 50 },
    style: {
      backgroundColor: '#0ea5e9',
      color: 'white',
      fontSize: '16px',
      padding: '10px 20px',
      borderRadius: '4px',
    },
    animation: 'fade',
    link: '',
    startTime: 0,
    endTime: 10,
  })
  
  // Initialize form with CTA data if provided
  useEffect(() => {
    if (cta) {
      setFormData({
        ...cta
      })
    }
  }, [cta])
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(formData)
  }
  
  // Animation presets
  const animationOptions = [
    { value: 'fade', label: 'Fade In/Out' },
    { value: 'slide', label: 'Slide In/Out' },
    { value: 'bounce', label: 'Bounce' }
  ]
  
  // CTA type options
  const typeOptions = [
    { value: 'button', label: 'Button' },
    { value: 'banner', label: 'Banner' }
  ]
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {cta ? 'Edit CTA' : 'Add New CTA'}
        </h3>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* CTA Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Type size={16} />
              CTA Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input"
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* CTA Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text
            </label>
            <input
              type="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="input"
              placeholder="Enter CTA text"
              required
            />
          </div>
          
          {/* Position */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Move size={16} />
              Position
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">X (%)</label>
                <input
                  type="number"
                  name="position.x"
                  value={formData.position.x}
                  onChange={handleChange}
                  className="input"
                  min="0"
                  max="100"
                  step="1"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Y (%)</label>
                <input
                  type="number"
                  name="position.y"
                  value={formData.position.y}
                  onChange={handleChange}
                  className="input"
                  min="0"
                  max="100"
                  step="1"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Timing */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Clock size={16} />
              Timing
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start (sec)</label>
                <input
                  type="number"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="input"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End (sec)</label>
                <input
                  type="number"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="input"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Animation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Animation
            </label>
            <select
              name="animation"
              value={formData.animation}
              onChange={handleChange}
              className="input"
            >
              {animationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Link */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Link size={16} />
              Affiliate Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="input"
              placeholder="https://example.com/affiliate-link"
              required
            />
          </div>
          
          {/* Styling */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Palette size={16} />
              Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Background</label>
                <input
                  type="color"
                  name="style.backgroundColor"
                  value={formData.style.backgroundColor}
                  onChange={handleChange}
                  className="w-full h-8 p-0 border rounded"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Text Color</label>
                <input
                  type="color"
                  name="style.color"
                  value={formData.style.color}
                  onChange={handleChange}
                  className="w-full h-8 p-0 border rounded"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Border Radius</label>
                <select
                  name="style.borderRadius"
                  value={formData.style.borderRadius}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="0">None</option>
                  <option value="4px">Small</option>
                  <option value="8px">Medium</option>
                  <option value="30px">Rounded</option>
                  <option value="9999px">Pill</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Font Size</label>
                <select
                  name="style.fontSize"
                  value={formData.style.fontSize}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="12px">Small</option>
                  <option value="14px">Medium</option>
                  <option value="16px">Large</option>
                  <option value="20px">X-Large</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Preview */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div className="flex items-center justify-center p-6 bg-gray-100 rounded-lg">
              {formData.type === 'button' ? (
                <button
                  className="cta-button"
                  style={formData.style}
                >
                  {formData.text || 'Button Text'}
                </button>
              ) : (
                <div
                  className="cta-overlay"
                  style={formData.style}
                >
                  {formData.text || 'Banner Text'}
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            {cta && (
              <button
                type="button"
                className="btn btn-outline text-red-600 hover:bg-red-50"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
            <button
              type="button"
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary ml-auto"
            >
              {cta ? 'Update' : 'Add'} CTA
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default CtaEditor
