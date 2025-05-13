<template>
  <section class="news-grid-section">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando noticias...</p>
    </div>
    
    <div v-if="error" class="error-state">
      <h3>Error al cargar las noticias</h3>
      <p>{{ error }}</p>
    </div>
    
    <div v-else class="grid-container">
      <article 
        v-for="article in articles" 
        :key="article.url"
        class="news-card"
        @click="goToArticle(article.url)"
      >
        <div class="image-container">
          <img :src="article.image" :alt="article.title" />
        </div>
        <div class="card-content">
          <span class="date">{{ article.publishedAt }}</span>
          <h3>{{ article.title }}</h3>
          <p>{{ article.description }}</p>
          <span class="author">{{ article.author }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  articles: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: ''
  }
});

const goToArticle = (url) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.news-grid-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.news-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.image-container {
  height: 180px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.news-card:hover .image-container img {
  transform: scale(1.05);
}

.card-content {
  padding: 1.25rem;
}

.date {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

p {
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.author {
  font-size: 0.8rem;
  color: #64748b;
  font-style: italic;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr 1fr;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>