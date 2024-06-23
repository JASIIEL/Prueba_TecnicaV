
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

const httpLink = new HttpLink({
  uri: 'https://countries.trevorblades.com/',
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

provideApolloClient(apolloClient);
