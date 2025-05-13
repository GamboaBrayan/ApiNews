<template>
    <div class="search-page">
      <div class="search-header">
        <h1>Resultados de búsqueda: "{{ searchQuery }}"</h1>
        <p>{{ articles.length }} resultados encontrados</p>
      </div>
      <Grid 
        :articles="articles" 
        :loading="loading" 
        :error="error"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { getNews } from '../services/api';
  import Grid from '../components/grid.vue';
  
  const route = useRoute();
  const searchQuery = ref(route.query.q || '');
  const articles = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  
  const fetchSearchResults = async (query) => {
    if (!query.trim()) return;
    
    loading.value = true;
    error.value = null;
    
    try {
      articles.value = await getNews(query);
    } catch (err) {
      error.value = 'Error al buscar noticias';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    if (searchQuery.value) {
      fetchSearchResults(searchQuery.value);
    }
  });
  
  watch(() => route.query.q, (newQuery) => {
    searchQuery.value = newQuery || '';
    if (newQuery) {
      fetchSearchResults(newQuery);
    }
  });
  </script>
  
  <style scoped>
  .search-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .search-header {
    margin: 2rem 0;
    padding: 0 1rem;
  }
  
  .search-header h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }
  
  .search-header p {
    color: #64748b;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .search-header h1 {
      font-size: 1.5rem;
    }
  }
  </style>