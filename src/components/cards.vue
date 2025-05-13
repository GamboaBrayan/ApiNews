<template>
    <article class="news-card">
      <div class="image-container">
        <img 
          :src="article.image" 
          :alt="article.title"
          class="news-image"
          @error="handleImageError"
        />
      </div>
      <div class="news-content">
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
        <div class="news-meta">
          <span class="author">{{ article.author }}</span>
          <span class="date">{{ article.publishedAt }}</span>
        </div>
        <a 
          :href="article.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="read-more"
        >
          Leer más →
        </a>
      </div>
      
    </article>
  </template>
  
  <script setup>
  const props = defineProps({
    article: {
      type: Object,
      required: true
    }
  });
  
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
  };
  </script>
  
  <style scoped>
  .news-card {
    border: 1px solid #eaeaea;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: white;
  }
  
  .news-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .image-container {
    height: 200px;
    overflow: hidden;
  }
  
  .news-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  .news-card:hover .news-image {
    transform: scale(1.05);
  }
  
  .news-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-align: left;
  }
  
  .news-meta {
    padding-top: 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 0.8rem;
    color: #7f8c8d;
  }
  
  .news-content h3 {
    margin: 0 0 0.75rem 0;
    font-size: 1.1rem;
    line-height: 1.4;
    color: #2c3e50;
  }
  
  .news-content p {
    color: #34495e;
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
    line-height: 1.5;
    flex-grow: 1;
  }
  
  .read-more {
    color: #3498db;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: color 0.2s;
    align-self: flex-start;
  }
  
  .read-more:hover {
    color: #2980b9;
  }
  
  @media (max-width: 1024px) {
    .image-container {
      height: 180px;
    }
  }
  
  @media (max-width: 768px) {
    .image-container {
      height: 160px;
    }
    
    .news-content {
      padding: 1rem;
    }
    
    .news-content h3 {
      font-size: 1rem;
    }
    
    .news-content p {
      font-size: 0.85rem;
    }
  }
  </style>