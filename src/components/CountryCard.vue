<template>
  <div class="country-card">
    <!-- Imagen grande del país -->
    <img class="main-image" :src="`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`" alt="Imagen de {{ country.name }}" />
    <!-- Información del país con la bandera pequeña -->
    <div class="country-info">
      <div class="text-info">
        <h2>{{ country.name }}</h2>
        <p>{{ country.continent.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    country: Object
  },
  created() {
    console.log('Datos del país:', this.country); 
  }
}
</script>

<style scoped>
.country-card {
  background-color: var(--card-bg-color, #fff);
  border: 1px solid var(--card-border-color, #ddd);
  border-radius: 30px;
  box-shadow: var(--box-shadow, 0 4px 8px rgba(0, 0, 0, 0.1));
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
  max-width: 100%; 
  width: 100%;
}

.country-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(4, 0, 235, 0.2);
}

.country-card img {
  width: 100%;
  height: auto;
  max-height: 150px; 
  object-fit: cover;
}

.country-info {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: rgba(0, 47, 255, 0); 
}

.country-info h2 {
  font-size: 18px;
  margin: 10px 0 5px;
  color: rgba(18, 87, 190, 0.925);
  font-size: 25px;
  text-transform: uppercase;
}

.country-info p {
  color: var(--secondary-color, #555);
  margin: 5px 0;
}

.small-flag {
  margin-right: 10px;
  width: 100%;
  height: auto;
  max-height: 150px; 
  object-fit: cover;
}
</style>
