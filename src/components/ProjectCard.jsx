import { Link } from 'react-router-dom'
import { Edit, Play, Trash2 } from 'lucide-react'

const ProjectCard = ({ project, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }
  
  return (
    <div className="card group hover:shadow-md transition-shadow duration-300">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.thumbnail} 
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex gap-2">
            <Link 
              to={`/editor/${project.id}`}
              className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <Edit size={16} />
            </Link>
            <Link 
              to={`/preview/${project.id}`}
              className="p-2 bg-primary-600 rounded-full text-white hover:bg-primary-700 transition-colors"
            >
              <Play size={16} />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
          </div>
          <button 
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Updated {formatDate(project.updated)}</span>
          <span>{project.ctas.length} CTA{project.ctas.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
