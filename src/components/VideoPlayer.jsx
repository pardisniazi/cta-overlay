import { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import { motion, AnimatePresence } from 'framer-motion'

const VideoPlayer = ({ 
  videoUrl, 
  ctas = [], 
  isEditing = false, 
  onCtaClick = () => {},
  onCtaPositionChange = () => {},
  onProgress = () => {},
  onDuration = () => {}
}) => {
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [visibleCtas, setVisibleCtas] = useState([])
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  
  // Update current time while playing
  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds)
    onProgress(state.playedSeconds)
  }
  
  // Handle duration change
  const handleDuration = (duration) => {
    setDuration(duration)
    onDuration(duration)
  }
  
  // Update visible CTAs based on current time
  useEffect(() => {
    const visible = ctas.filter(
      cta => currentTime >= cta.startTime && currentTime <= cta.endTime
    )
    setVisibleCtas(visible)
  }, [ctas, currentTime])
  
  // Handle CTA drag in edit mode
  const handleDrag = (ctaId, info) => {
    if (!containerRef.current) return
    
    const container = containerRef.current.getBoundingClientRect()
    const x = (info.point.x - container.left) / container.width * 100
    const y = (info.point.y - container.top) / container.height * 100
    
    onCtaPositionChange(ctaId, { x, y })
  }
  
  // Animation variants for different CTA animations
  const animationVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.5 } },
      exit: { opacity: 0, transition: { duration: 0.3 } }
    },
    slide: {
      initial: { x: -50, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
      exit: { x: 50, opacity: 0, transition: { duration: 0.3 } }
    },
    bounce: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { 
        scale: 1, 
        opacity: 1, 
        transition: { 
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 15
        } 
      },
      exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } }
    }
  }
  
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg" ref={containerRef}>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        width="100%"
        height="auto"
        playing={playing}
        volume={volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        progressInterval={100}
        controls
      />
      
      {/* CTA Overlays */}
      <AnimatePresence>
        {visibleCtas.map(cta => {
          const animation = animationVariants[cta.animation] || animationVariants.fade
          
          return (
            <motion.div
              key={cta.id}
              className="absolute"
              style={{
                left: `${cta.position.x}%`,
                top: `${cta.position.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10
              }}
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              drag={isEditing}
              dragMomentum={false}
              onDragEnd={(_, info) => handleDrag(cta.id, info)}
            >
              {cta.type === 'button' && (
                <button
                  className="cta-button"
                  style={cta.style}
                  onClick={() => !isEditing && onCtaClick(cta)}
                >
                  {cta.text}
                </button>
              )}
              
              {cta.type === 'banner' && (
                <div
                  className="cta-overlay"
                  style={cta.style}
                  onClick={() => !isEditing && onCtaClick(cta)}
                >
                  {cta.text}
                </div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default VideoPlayer
