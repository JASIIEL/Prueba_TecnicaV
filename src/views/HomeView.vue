<template>
  <div>
    <SearchBar @search="filterCountries" @filter-continents="filterByContinents" />

    <div v-if="loading">Cargando países...</div>
    <div v-else-if="error">Error al cargar los países: {{ error.message }}</div>

    <div v-else class="countries-grid">
      <CountryCard 
        v-for="country in paginatedCountries" 
        :key="country.code" 
        :country="country" 
        @click="selectCountry(country)" 
      />
    </div>

    <CountryDetailCard 
      v-if="selectedCountry" 
      :country="selectedCountry" 
      @close="selectedCountry = null" 
    />

    <div v-if="totalPages > 1" class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">Siguiente</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onActivated } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import SearchBar from '../components/SearchBar.vue';
import CountryCard from '../components/CountryCard.vue';
import CountryDetailCard from '../components/CountryDetailCard.vue';

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
      emoji
    }
  }
`;

export default {
  components: { SearchBar, CountryCard, CountryDetailCard },
  setup() {
    const countries = ref([]);
    const searchQuery = ref('');
    const selectedContinents = ref([]);
    const selectedCountry = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = ref(9);
    const { result, loading, error, refetch } = useQuery(GET_COUNTRIES, null, {
      fetchPolicy: 'cache-and-network'
    });

    watch(result, (newValue) => {
      if (newValue) {
        countries.value = newValue.countries;
        console.log('Países cargados:', countries.value);
      }
    });

    onActivated(() => {
      if (!countries.value.length) {
        refetch();
      }
    });

    const filteredCountries = computed(() => {
      let filtered = countries.value;

      if (searchQuery.value) {
        filtered = filtered.filter(country => 
          country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }

      if (selectedContinents.value.length > 0) {
        filtered = filtered.filter(country => 
          selectedContinents.value.some(continent => 
            country.continent.name === continent.name
          )
        );
      }

      return filtered;
    });

    const paginatedCountries = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredCountries.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredCountries.value.length / itemsPerPage.value);
    });

    const filterCountries = (query) => {
      searchQuery.value = query;
      currentPage.value = 1; 
    };

    const filterByContinents = (continents) => {
      selectedContinents.value = continents;
      currentPage.value = 1; 
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };

    const selectCountry = (country) => {
      selectedCountry.value = country;
    };

    return {
      countries,
      filteredCountries,
      paginatedCountries,
      currentPage,
      totalPages,
      filterCountries,
      filterByContinents,
      prevPage,
      nextPage,
      selectedCountry,
      selectCountry,
      loading,
      error
    };
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #0d3f74;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.pagination span {
  font-weight: bold;
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .countries-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .countries-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
