import {
    InMemoryCache,
    ApolloClient,
    HttpLink,
} from "@apollo/client";

let apolloClient;

function createApolloClient() {
    return new ApolloClient({
        link: new HttpLink({
            uri: "https://exoticplant.vercel.app/graphql",
        }),
        cache: new InMemoryCache(),
    });
}

function initializeApollo() {
    apolloClient = apolloClient ?? createApolloClient();
    return apolloClient;
}

export function useApollo() {
    return initializeApollo();
}