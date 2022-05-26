import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    split
} from "@apollo/client";
import {GraphQLWsLink,} from '@apollo/client/link/subscriptions';
import {getMainDefinition} from '@apollo/client/utilities';
import {setContext} from "@apollo/client/link/context";
import {createClient} from 'graphql-ws';

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL
});

const wsLink = new GraphQLWsLink(createClient({
    url: `ws://10.80.0.168:3000/graphql`,
}));

const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);


const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            ...headers,
            authorization: token ?? ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
);