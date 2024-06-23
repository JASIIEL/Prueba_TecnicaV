<template>
  <div>
    <!-- Icono de menú hamburguesa -->
    <div class="hamburger-icon" ref="hamburgerIcon" @click="toggleSidebar">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-visible': isSidebarVisible }" ref="sidebar">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo">
      </div>
      <nav class="nav">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/vista1">Continente</router-link></li>
          <li><router-link to="/vista2">Vista 2</router-link></li>
        </ul>
      </nav>
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
  data() {
    return {
      isSidebarVisible: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    filterContinent(continent) {
      this.$emit('filter', continent);
    },
    handleClickOutside(event) {
      if (
        this.isSidebarVisible &&
        !this.$refs.sidebar.contains(event.target) &&
        !this.$refs.hamburgerIcon.contains(event.target)
      ) {
        this.isSidebarVisible = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>
.hamburger-icon {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  position: fixed;
  top: 20px;
  left: 20px;
}

.hamburger-icon div {
  width: 30px;
  height: 3px;
  background-color: #0d3f74;
  margin: 5px 0;
}

.sidebar {
  background-color: #0d3f74;
  color: var(--sidebar-text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  height: 100vh;
  box-shadow: var(--box-shadow);
  position: fixed;
  top: 0;
  left: -250px;
  transition: left 0.3s;
}

.sidebar-visible {
  left: 0;

}

.logo img {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
}

.nav ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
}

.nav li {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 20px;
}

.nav a {
  text-decoration: none;
  color: var(--sidebar-text-color);
  display: block;
  padding: 10px;
  transition: background 0.3s;
}

.nav a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px; 
}

.nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}

.filter {
  margin-top: 20px;
  text-align: center;
}

.filter h3 {
  margin-bottom: 10px;
  color: var(--sidebar-text-color);
}

.filter ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter li {
  cursor: pointer;
  padding: 10px;
  text-align: center;
  border: 1px solid var(--sidebar-text-color);
  margin-bottom: 10px;
  transition: background 0.3s;
}

.filter li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}







</style>
