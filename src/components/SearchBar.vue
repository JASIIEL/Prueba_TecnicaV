<template>
  <div class="search-bar">
    <input type="text" placeholder="Escribe el país que deseas ver" @focus="showFilter = true" v-model="query" />
    <button @click="search">Buscar</button>
    <ContinentFilter :visible="showFilter" @apply-filter="filterByContinent" />
  </div>
</template>

<script>
import ContinentFilter from './ContinentFilter.vue';

export default {
  components: { ContinentFilter },
  data() {
    return {
      query: '',
      showFilter: false
    };
  },
  methods: {
    search() {
      this.$emit('search', this.query);
    },
    filterByContinent(selectedContinents) {
      this.$emit('filter-continents', selectedContinents);
      this.showFilter = false;
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: flex-start; 
  align-items: center; 
  margin: 20px 0;
  width: 100%;
}

.search-bar input {
  padding: 20px;
  width: 1000px; 
  max-width: 100%;
  border: 2px solid #021529;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
  margin-left: 25% 
}

.search-bar button {
  background-color:#0d3f74;
  color: var(--button-text-color);
  border: none;
  padding: 22px;
  cursor: pointer;
  border-radius: 20px;
  margin-left: 10px;
}

.search-bar button:hover {
  background-color: #163d66;
}

@media (max-width: 375px) {
  .search-bar{
    flex-direction: column;
  }
  .search-bar input{
    width: 300px;
    margin-left: 20%;
    margin-bottom: 10px;
  }
  .search-bar button{
    width: 50%;
    padding: 15px;
  }
  
}
</style>
