import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
// import { OperationDefinitionNode } from "@apollo/client/utilities/types";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
import { LinkContextProvider } from "./context/link-context.tsx";
import { AuthProvider } from "./context/auth-context.tsx";
import { AppContextProvider } from "./context/app-context.tsx";
import { Definition } from "./types.ts";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };
});

// link for subscription

const wsLink = new WebSocketLink({
  uri: "ws://hacker-news-backend.onrender.com/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem("token"),
    },
  },
});

// link for mutation & query
const httpLink = createHttpLink({
  uri: "https://hacker-news-backend.onrender.com/graphql",
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as Definition;
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AppContextProvider>
          <AuthProvider>
            <LinkContextProvider>
              <App />
            </LinkContextProvider>
          </AuthProvider>
        </AppContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
