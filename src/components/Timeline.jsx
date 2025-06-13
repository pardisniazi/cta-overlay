import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const Timeline = ({ 
  duration = 0, 
  currentTime = 0, 
  ctas = [], 
  onSeek = () => {},
  onCtaSelect = () => {},
  selectedCtaId = null
}) => {
  const timelineRef = useRef(null)
  const [timelineWidth, setTimelineWidth] = useState(0)
  
  // Update timeline width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.offsetWidth)
      }
    }
    
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])
  
  // Convert time to position
  const timeToPosition = (time) => {
    if (duration === 0) return 0
    return (time / duration) * 100
  }
  
  // Convert position to time
  const positionToTime = (position) => {
    if (timelineWidth === 0) return 0
    const percent = position / timelineWidth
    return percent * duration
  }
  
  // Handle timeline click for seeking
  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return
    
    const rect = timelineRef.current.getBoundingClientRect()
    const position = e.clientX - rect.left
    const time = positionToTime(position)
    
    onSeek(time)
  }
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="w-full p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      <div 
        ref={timelineRef}
        className="relative h-12 bg-gray-100 rounded-md cursor-pointer"
        onClick={handleTimelineClick}
      >
        {/* Timeline marker */}
        <div className="timeline-marker" />
        
        {/* Current time indicator */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-primary-600 z-10"
          style={{ left: `${timeToPosition(currentTime)}%` }}
        >
          <div className="absolute -top-1 -left-1.5 w-3 h-3 rounded-full bg-primary-600" />
        </div>
        
        {/* CTA markers */}
        {ctas.map(cta => (
          <div key={cta.id} className="absolute top-0 h-full">
            {/* Start marker */}
            <motion.div 
              className={`timeline-item top-1 ${selectedCtaId === cta.id ? 'scale-110' : ''}`}
              style={{ 
                left: `${timeToPosition(cta.startTime)}%`,
                backgroundColor: selectedCtaId === cta.id ? '#0ea5e9' : '#64748b'
              }}
              whileHover={{ scale: 1.2 }}
              onClick={(e) => {
                e.stopPropagation()
                onCtaSelect(cta.id)
              }}
            >
              <div className="w-3 h-3 rounded-full" />
            </motion.div>
            
            {/* CTA duration bar */}
            <div 
              className="absolute h-2 top-1/2 -mt-1 rounded-full cursor-pointer"
              style={{
                left: `${timeToPosition(cta.startTime)}%`,
                width: `${timeToPosition(cta.endTime) - timeToPosition(cta.startTime)}%`,
                backgroundColor: selectedCtaId === cta.id ? 'rgba(14, 165, 233, 0.5)' : 'rgba(100, 116, 139, 0.3)'
              }}
              onClick={(e) => {
                e.stopPropagation()
                onCtaSelect(cta.id)
              }}
            />
            
            {/* End marker */}
            <motion.div 
              className={`timeline-item top-1 ${selectedCtaId === cta.id ? 'scale-110' : ''}`}
              style={{ 
                left: `${timeToPosition(cta.endTime)}%`,
                backgroundColor: selectedCtaId === cta.id ? '#0ea5e9' : '#64748b'
              }}
              whileHover={{ scale: 1.2 }}
              onClick={(e) => {
                e.stopPropagation()
                onCtaSelect(cta.id)
              }}
            >
              <div className="w-3 h-3 rounded-full" />
            </motion.div>
            
            {/* CTA label */}
            <div 
              className="absolute bottom-1 text-xs font-medium px-1 rounded whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ 
                left: `${timeToPosition(cta.startTime)}%`,
                maxWidth: `${timeToPosition(cta.endTime) - timeToPosition(cta.startTime)}%`,
                backgroundColor: selectedCtaId === cta.id ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
                color: selectedCtaId === cta.id ? '#0ea5e9' : '#64748b'
              }}
              onClick={(e) => {
                e.stopPropagation()
                onCtaSelect(cta.id)
              }}
            >
              {cta.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
