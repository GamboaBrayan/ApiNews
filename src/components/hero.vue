<template>
    <section class="hero-section">
      <!-- Buscador en la parte superior -->
      <div class="search-container">
        <input
          v-model="searchQuery"
          @keyup.enter="navigateToSearch"
          type="text"
          placeholder="Buscar noticias..."
          class="search-input"
        />
        <button @click="navigateToSearch" class="search-button">
        Buscar
        </button>
      </div>
      <!-- Bento Grid -->
      <div class="bento-grid">
        <!-- Celda principal-->
        <div 
          v-if="featuredNews[0]" 
          class="bento-cell main-cell"
          @click="goToArticle(featuredNews[0].url)"
        >
          <img :src="featuredNews[0].image" :alt="featuredNews[0].title" />
          <div class="cell-content">
            <span class="category-tag">Destacado</span>
            <h3>{{ featuredNews[0].title }}</h3>
            <p>{{ featuredNews[0].description }}</p>
          </div>
        </div>
  
        <!-- Celdas secundarias -->
        <div 
          v-for="(article, index) in featuredNews.slice(1, 5)" 
          :key="article.url"
          class="bento-cell"
          :class="`cell-${index + 1}`"
          @click="goToArticle(article.url)"
        >
          <img :src="article.image" :alt="article.title" />
          <div class="cell-content">
            <h4>{{ article.title }}</h4>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const emit = defineEmits(['featured-loaded']);
  
  const props = defineProps({
    featuredNews: {
      type: Array,
      required: true,
      default: () => []
    }
  });
  
  const searchQuery = ref('');
  
  const navigateToSearch = () => {
    if (searchQuery.value.trim()) {
      router.push({ path: '/buscar', query: { q: searchQuery.value.trim() } });
    }
  };
  
  const goToArticle = (url) => {
    window.open(url, '_blank');
  };
  </script>
  
  <style scoped>
  .hero-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .search-container {
    max-width: 800px;
    margin: 0 auto 2rem;
    display: flex;
    gap: 0.5rem;
  }
  
  .search-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .search-button {
    padding: 0 1.5rem;
    background-color: #131314;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
  }
  
  .search-button:hover {
    background-color: #1d4ed8;
  }
  
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 120px);
    gap: 1rem;
    margin-bottom: 3rem;
  }
  
  .bento-cell {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    background-color: #f8fafc;
  }
  
  .bento-cell:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  .bento-cell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  
  .bento-cell:hover img {
    transform: scale(1.05);
  }
  
  .main-cell {
    grid-column: span 3;
    grid-row: span 4;
  }
  
  .cell-1 {
    grid-column: 4;
    grid-row: span 2;
  }
  
  .cell-2 {
    grid-column: 5;
    grid-row: span 2;
  }
  
  .cell-3 {
    grid-column: 4;
    grid-row: 3 / span 2;
  }
  
  .cell-4 {
    grid-column: 5;
    grid-row: 3 / span 2;
  }
  
  .cell-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    color: white;
  }
  
  .main-cell .cell-content {
    padding: 2rem;
  }
  
  .category-tag {
    display: inline-block;
    background-color: #2563eb;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0.5rem 0;
    line-height: 1.3;
  }
  
  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.25rem 0;
    line-height: 1.3;
  }
  
  p {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-top: 0.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  @media (max-width: 1024px) {
    .bento-grid {
      grid-template-rows: repeat(5, 100px);
    }
    
    h3 {
      font-size: 1.25rem;
    }
  }
  
  @media (max-width: 768px) {
    .bento-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
    }
    
    .main-cell {
      grid-column: span 2;
      grid-row: span 2;
      height: 300px;
    }
    
    .bento-cell {
      height: 150px;
    }
    
    .search-container {
      flex-direction: column;
    }
    
    .search-button {
      padding: 0.75rem;
    }
  }
  
  @media (max-width: 480px) {
    .bento-grid {
      grid-template-columns: 1fr;
    }
    
    .main-cell {
      grid-column: span 1;
    }
    
    .cell-content {
      padding: 1rem;
    }
    
    h3 {
      font-size: 1.1rem;
    }
  }
  </style>