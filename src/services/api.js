import axios from 'axios';

export const getNews = async (query = 'tecnologia') => {
  try {
    // 1. Llama al proxy de Netlify con la query
    const response = await axios.get('/.netlify/functions/newsapi', {
      params: { q: query }
    });

    // 2. Mapeo de datos idéntico al original
    return response.data.map(article => ({
      author: article.author || 'Autor no disponible',
      title: article.title || 'Sin título',
      description: article.description || 'Descripción no disponible',
      image: article.urlToImage || 'https://via.placeholder.com/300x200?text=Imagen+no+disponible',
      publishedAt: new Date(article.publishedAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      url: article.url
    }));
  } catch (error) {
    // 3. Error mejorado para el usuario
    console.error('Error en getNews:', error.response?.data || error.message);
    throw new Error('No se pudieron cargar las noticias. Intenta con otro término.');
  }
};