import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

const useProjectStore = create((set, get) => ({
  projects: [
    {
      id: '1',
      name: 'Product Review - Fitness Watch',
      description: 'Review video with affiliate CTAs for fitness watch',
      videoUrl: 'https://www.youtube.com/watch?v=UBMk30rjy0o',
      thumbnail: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      created: new Date('2023-07-15').toISOString(),
      updated: new Date('2023-07-18').toISOString(),
      ctas: [
        {
          id: 'cta1',
          type: 'button',
          text: 'Get 20% Off Today',
          position: { x: 50, y: 70 },
          style: {
            backgroundColor: '#ff4757',
            color: 'white',
            fontSize: '16px',
            padding: '10px 20px',
            borderRadius: '30px',
          },
          animation: 'bounce',
          link: 'https://example.com/product/fitness-watch',
          startTime: 5,
          endTime: 15,
        },
        {
          id: 'cta2',
          type: 'banner',
          text: 'Limited Time Offer',
          position: { x: 50, y: 20 },
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '4px',
          },
          animation: 'fade',
          link: 'https://example.com/offer',
          startTime: 20,
          endTime: 30,
        }
      ]
    },
    {
      id: '2',
      name: 'Cooking Tutorial - Kitchen Gadgets',
      description: 'Cooking tutorial with affiliate links to kitchen tools',
      videoUrl: 'https://www.youtube.com/watch?v=ZJy1ajvMU1k',
      thumbnail: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      created: new Date('2023-06-10').toISOString(),
      updated: new Date('2023-06-12').toISOString(),
      ctas: [
        {
          id: 'cta3',
          type: 'button',
          text: 'Shop This Knife Set',
          position: { x: 20, y: 80 },
          style: {
            backgroundColor: '#2ed573',
            color: 'white',
            fontSize: '16px',
            padding: '10px 20px',
            borderRadius: '4px',
          },
          animation: 'slide',
          link: 'https://example.com/product/knife-set',
          startTime: 10,
          endTime: 20,
        }
      ]
    },
    {
      id: '3',
      name: 'Tech Review - Latest Smartphone',
      description: 'In-depth review of the newest smartphone with affiliate links',
      videoUrl: 'https://www.youtube.com/watch?v=FT3ODSg1GFE',
      thumbnail: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      created: new Date('2023-08-05').toISOString(),
      updated: new Date('2023-08-07').toISOString(),
      ctas: [
        {
          id: 'cta4',
          type: 'button',
          text: 'Buy Now with $50 Off',
          position: { x: 75, y: 60 },
          style: {
            backgroundColor: '#1e90ff',
            color: 'white',
            fontSize: '16px',
            padding: '10px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          },
          animation: 'bounce',
          link: 'https://example.com/product/smartphone',
          startTime: 15,
          endTime: 30,
        },
        {
          id: 'cta5',
          type: 'banner',
          text: 'Exclusive Discount Code: TECH2023',
          position: { x: 50, y: 10 },
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '4px',
            fontWeight: 'bold',
          },
          animation: 'slide',
          link: 'https://example.com/discount',
          startTime: 40,
          endTime: 55,
        }
      ]
    }
  ],
  
  currentProject: null,
  
  setCurrentProject: (projectId) => {
    const project = get().projects.find(p => p.id === projectId);
    set({ currentProject: project || null });
  },
  
  createProject: (projectData) => {
    const newProject = {
      id: uuidv4(),
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      ctas: [],
      ...projectData
    };
    
    set(state => ({
      projects: [...state.projects, newProject],
      currentProject: newProject
    }));
    
    return newProject.id;
  },
  
  updateProject: (projectId, data) => {
    set(state => {
      const updatedProjects = state.projects.map(project => 
        project.id === projectId 
          ? { ...project, ...data, updated: new Date().toISOString() } 
          : project
      );
      
      const updatedProject = updatedProjects.find(p => p.id === projectId);
      
      return {
        projects: updatedProjects,
        currentProject: state.currentProject?.id === projectId 
          ? updatedProject 
          : state.currentProject
      };
    });
  },
  
  deleteProject: (projectId) => {
    set(state => ({
      projects: state.projects.filter(project => project.id !== projectId),
      currentProject: state.currentProject?.id === projectId 
        ? null 
        : state.currentProject
    }));
  },
  
  addCta: (projectId, ctaData) => {
    const newCta = {
      id: uuidv4(),
      ...ctaData
    };
    
    set(state => {
      const updatedProjects = state.projects.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              ctas: [...project.ctas, newCta],
              updated: new Date().toISOString()
            } 
          : project
      );
      
      const updatedProject = updatedProjects.find(p => p.id === projectId);
      
      return {
        projects: updatedProjects,
        currentProject: state.currentProject?.id === projectId 
          ? updatedProject 
          : state.currentProject
      };
    });
    
    return newCta.id;
  },
  
  updateCta: (projectId, ctaId, data) => {
    set(state => {
      const updatedProjects = state.projects.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              ctas: project.ctas.map(cta => 
                cta.id === ctaId 
                  ? { ...cta, ...data } 
                  : cta
              ),
              updated: new Date().toISOString()
            } 
          : project
      );
      
      const updatedProject = updatedProjects.find(p => p.id === projectId);
      
      return {
        projects: updatedProjects,
        currentProject: state.currentProject?.id === projectId 
          ? updatedProject 
          : state.currentProject
      };
    });
  },
  
  deleteCta: (projectId, ctaId) => {
    set(state => {
      const updatedProjects = state.projects.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              ctas: project.ctas.filter(cta => cta.id !== ctaId),
              updated: new Date().toISOString()
            } 
          : project
      );
      
      const updatedProject = updatedProjects.find(p => p.id === projectId);
      
      return {
        projects: updatedProjects,
        currentProject: state.currentProject?.id === projectId 
          ? updatedProject 
          : state.currentProject
      };
    });
  }
}));

export default useProjectStore;
