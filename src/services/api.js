import axios from 'axios';

const BASE_URL = 'https://newsapi.org/v2';

export const getNews = async (query = 'tecnologia') => {
  try {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 7);

    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        from: fromDate.toISOString().split('T')[0],
        sortBy: 'popularity',
        pageSize: 20,
        language: 'es'
      },
      headers: {
        'X-Api-Key': import.meta.env.VITE_NEWS_API_KEY // ✅ Key en headers (seguro)
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