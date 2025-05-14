import axios from 'axios';

// Cambia la URL base para usar el proxy de Netlify Functions
const PROXY_URL = '/.netlify/functions/newsapi';

export const getNews = async (query = 'tecnologia') => {
  try {
    const response = await axios.get(PROXY_URL, {
      params: {
        q: query
      }
    });

    // Mapea los artículos directamente desde la respuesta del proxy
    return response.data.map(article => ({
      author: article.author || 'Autor no disponible',
      title: article.title || 'Sin título',
      description: article.description || 'Descripción no disponible',
      image: article.urlToImage || 'https://via.placeholder.com/300x200?text=Imagen+no+disponible',
      publishedAt: formatDate(article.publishedAt),
      url: article.url
    }));
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);
    throw new Error('No se pudieron cargar las noticias. Intenta nuevamente más tarde.');
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