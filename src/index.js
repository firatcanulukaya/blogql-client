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
import {createClient} from 'graphql-ws';
import {Provider} from "react-redux";
import store from "./redux";

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL
});

const wsLink = new GraphQLWsLink(createClient({
    url: process.env.REACT_APP_WS_URL
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

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
);