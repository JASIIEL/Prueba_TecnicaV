<template>
  <div>
    <CountryDetails :name="$route.params.name" />
  </div>
</template>

<script>
import CountryDetails from '../components/CountryDetails.vue';

export default {
  components: { CountryDetails }
};
</script>
