const axios = require('axios');

exports.handler = async (event) => {
  // 1. Captura el término de búsqueda con valor por defecto
  const { q: query = 'tecnologia' } = event.queryStringParameters;
  
  // 2. Configura fechas (últimos 7 días)
  const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  try {
    // 3. Llama a NewsAPI con todos los parámetros originales
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        from: fromDate,
        sortBy: 'popularity',
        pageSize: 20,
        language: 'es'
      },
      headers: {
        'X-Api-Key': process.env.VITE_NEWS_API_KEY
      }
    });

    // 4. Devuelve solo los artículos (mismo formato que antes)
    return {
      statusCode: 200,
      body: JSON.stringify(response.data.articles)
    };
  } catch (error) {
    // 5. Manejo detallado de errores
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({
        error: 'Error en la búsqueda',
        details: error.message
      })
    };
  }
};