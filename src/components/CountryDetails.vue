<template>
  <div class="country-details" v-if="country">
    <img :src="country.image" alt="Imagen de {{ country.name }}" />
    <h1>{{ country.name }}</h1>
    <p><strong>Capital:</strong> {{ country.capital }}</p>
    <p><strong>Región:</strong> {{ country.region }}</p>
    <p><strong>Idioma:</strong> {{ languages }}</p>
    <p><strong>Moneda:</strong> {{ currency }}</p>
    <router-link to="/">Volver</router-link>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag'; 

const GET_COUNTRY_DETAILS = gql`
  query GetCountry($name: String!) {
    country(name: $name) {
      name
      capital
      region
      languages {
        name
      }
      currency {
        name
      }
      flag
    }
  }
`;

export default {
  props: {
    name: String
  },
  setup(props) {
    const country = ref(null);
    const { result, loading, error } = useQuery(GET_COUNTRY_DETAILS, {
      variables: { name: props.name }
    });

    onMounted(() => {
      if (result.value && result.value.country) {
        country.value = {
          ...result.value.country,
          image: result.value.country.flag
        };
      }
    });

    const languages = computed(() => country.value?.languages.map(l => l.name).join(', ') || '');
    const currency = computed(() => country.value?.currency.name || '');

    return {
      country,
      languages,
      currency,
      loading,
      error
    };
  }
};
</script>

<style scoped>
.country-details {
  text-align: center;
  padding: 20px;
}

.country-details img {
  width: 200px;
  height: auto;
  margin-bottom: 20px;
}

.country-details h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.country-details p {
  font-size: 16px;
  margin: 10px 0;
}

.country-details a {
  color: rgb(18, 18, 116);
  text-decoration: none;
  font-size: 20px;
}
</style>
