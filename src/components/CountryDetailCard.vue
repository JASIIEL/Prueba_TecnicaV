<template>
  <div class="detail-card" v-if="country">
    <button class="close-btn" @click="closeDetail">X</button>
    <img :src="`https://flagcdn.com/w320/${country.code.toLowerCase()}.png`" :alt="`Bandera de ${country.name}`" />
    <h2>{{ country.name }}</h2>
    <p><strong>CONTINENTE:</strong> {{ country.continent.name }}</p>
    <p><strong>CAPITAL:</strong> {{ country.capital }}</p>
    <p><strong>LENGUAJES:</strong> {{ country.languages.map(lang => lang.name).join(', ') }}</p>
    <p><strong>TIPO DE MONEDA:</strong> {{ country.code }}</p>
  </div>
</template>

<script>
export default {
  props: {
    country: Object
  },
  methods: {
    closeDetail() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.detail-card {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(255, 255, 255);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 1px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

img {
  width: 100%;
  border-radius: 10px;
}

h2 {
  margin: 13px 0;
  color: rgb(72, 74, 199);
  text-transform: uppercase;

}

strong {
    color: rgb(72, 74, 199);
    font-weight: 700;
}

p {

}
</style>
