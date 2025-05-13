<template>
  <div class="app" id="app">
    <NavBar @search="handleSearch" />
    
    <template v-if="!isSearchRoute">
      <Hero 
        :featured-news="featuredNews" 
        @search="handleSearch"
      />
      <Grid 
        v-if="showGeneralNews"
        :articles="generalNews" 
        :loading="loading" 
        :error="error"
        title="Últimas Noticias"
      />
    </template>
    
    <!-- Mostrar resultados de búsqueda -->
    <PageBusqueda 
      v-if="isSearchRoute"
      :search-query="currentSearchQuery"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getNews } from './services/api';
import NavBar from './components/navbar.vue';
import Hero from './components/hero.vue';
import PageBusqueda from './components/pagebusqueda.vue';
import Grid from './components/grid.vue';

const route = useRoute();

// Estados reactivos
const featuredNews = ref([]);
const generalNews = ref([]);
const loading = ref(false);
const error = ref(null);
const showGeneralNews = ref(false);

const isSearchRoute = computed(() => route.path === '/buscar');
const currentSearchQuery = computed(() => route.query.q || '');

// Obtener noticias destacadas
const fetchFeaturedNews = async () => {
  try {
    loading.value = true;
    const data = await getNews('tecnologia OR politica OR deportes');
    featuredNews.value = data.slice(0, 5);
  } catch (err) {
    error.value = 'Error al cargar noticias destacadas';
    console.error(err);
  }
};

// Obtener noticias generales
const fetchGeneralNews = async () => {
  try {
    const data = await getNews('general');
    generalNews.value = data;
    showGeneralNews.value = true;
  } catch (err) {
    error.value = 'Error al cargar noticias generales';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Manejar búsqueda
const handleSearch = (query) => {
  if (query.trim()) {
    window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
  }
};

// Cargar datos iniciales
onMounted(() => {
  fetchFeaturedNews();
  fetchGeneralNews();
});
</script>

<style>
.app {
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>