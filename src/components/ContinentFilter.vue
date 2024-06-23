<template>
  <div class="continent-filter" v-if="visible">
    <div class="continent-option" v-for="continent in continents" :key="continent.name" @click="toggleSelection(continent)">
      <p>{{ continent.name }}</p>
      <input type="checkbox" :checked="isSelected(continent)" />
    </div>
    <button @click="applyFilter">Aplicar Filtro</button>
    <button @click="clearFilter">Limpiar</button>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      continents: [
        { name: 'Europe', image: 'https://via.placeholder.com/50' },
        { name: 'North America', image: 'https://via.placeholder.com/50' },
        { name: 'South America', image: 'https://via.placeholder.com/50' },
        { name: 'Asia', image: 'https://via.placeholder.com/50' },
        { name: 'Oceania', image: 'https://via.placeholder.com/50' },
        { name: 'Africa', image: 'https://via.placeholder.com/50' },
      ],
      selectedContinents: []
    };
  },
  methods: {
    toggleSelection(continent) {
      if (this.isSelected(continent)) {
        this.selectedContinents = this.selectedContinents.filter(c => c.name !== continent.name);
      } else {
        this.selectedContinents.push(continent);
      }
    },
    isSelected(continent) {
      return this.selectedContinents.some(c => c.name === continent.name);
    },
    applyFilter() {
      this.$emit('apply-filter', this.selectedContinents);
    },
    clearFilter() {
      this.selectedContinents = [];
      this.$emit('apply-filter', this.selectedContinents);
    }
  }
}
</script>

<style scoped>
.continent-filter {
  position: absolute;
  top: 100px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 300px;
  margin-left: 520px;
}

.continent-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.continent-option img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.continent-option p {
  margin: 0;
  flex-grow: 1;
}

.continent-option input {
  margin-left: 10px;
}

button {
  margin-top: 10px;
  padding: 10px;
  background-color: #0d3f74;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #3488e2;
}
</style>
