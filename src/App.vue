<template>
  <div id="app">
    <AppSidebar @filter="filterByContinent" />
    <router-view />
  </div>
</template>

<script>
import AppSidebar from './components/Sidebar.vue';

export default {
  components: { AppSidebar }, // Asegúrate de que AppSidebar esté correctamente importado
  methods: {
    filterByContinent(continent) {
      if (continent) {
        console.log(`Filtrando por ${continent}`);
      }
    }
  }
};
</script>

<style>
@import './styles/variables.css';
@import './styles/main.css';

</style>

<style scoped>
/* Estilos para el contenedor principal */
#app {
  flex-direction: row; 
  min-height: 100vh;
  overflow-x: hidden; /* Evita desbordamiento horizontal */
}

/* Asegúrate de que el body y el html ocupen todo el ancho y alto de la pantalla */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden; 
}

/* Estilo adicional para asegurar que el contenido se ajuste correctamente */
.router-view {
  flex: 1; /* Permite que el contenido principal ocupe el espacio disponible */
  padding: 20px; /* Espaciado alrededor del contenido principal */
  box-sizing: border-box; /* Asegura que el padding se incluya dentro del tamaño total */
}
</style>
