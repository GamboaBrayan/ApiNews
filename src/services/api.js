import axios from 'axios';

const API_KEY = '3d0bbf05760d4fe393578e01e843c368';
const BASE_URL = 'https://newsapi.org/v2';

export const getNews = async (query = 'tecnologia') => {
  try {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 7); // Noticias de los últimos 7 días
    
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        from: fromDate.toISOString().split('T')[0], // Fecha dinámica (últimos 7 días)
        sortBy: 'popularity',
        apiKey: API_KEY,
        pageSize: 20,
        language: 'es'
      }
    });
    
    return response.data.articles.map(article => ({
      author: article.author || 'Autor no disponible',
      title: article.title || 'Sin título',
      description: article.description || 'Descripción no disponible',
      image: article.urlToImage || 'https://via.placeholder.com/300x200?text=Imagen+no+disponible',
      publishedAt: formatDate(article.publishedAt),
      url: article.url
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};


const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible';
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};