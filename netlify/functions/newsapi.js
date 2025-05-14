const axios = require('axios');

exports.handler = async (event) => {
  const { query = 'tecnologia' } = event.queryStringParameters;
  
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        sortBy: 'popularity',
        pageSize: 20,
        language: 'es'
      },
      headers: {
        'X-Api-Key': process.env.VITE_NEWS_API_KEY
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.articles)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener noticias' })
    };
  }
};