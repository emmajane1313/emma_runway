import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const emancipaLink = new HttpLink({
  uri: `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_KEY}/subgraphs/id/Bz5p67HZ7uckyQyJkbw742kfHNWC5jxkjhuLgQM9YS23`,
}); 

export const emancipaClient = new ApolloClient({
  link: emancipaLink,
  cache: new InMemoryCache(),
});
