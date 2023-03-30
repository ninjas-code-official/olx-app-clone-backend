import { ApolloClient, ApolloLink, concat, createHttpLink, Observable, split } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getEnvVars from "../../environment";

const { GRAPHQL_URL, WS_GRAPHQL_URL } = getEnvVars();

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        nearByItems: {
          merge(existing, incoming) {
            // Equivalent to what happens if there is no custom merge function.
            return incoming;
          },
        },
      },
    },
    User: {
      fields: {
        likes: {
          merge: false,
        },
        followers: {
          merge: false,
        },
        following: {
          merge: false,
        },
      },
    },
    Item: {
      fields: {
        status: {
          merge: false,
        },
      },
    },
    nearByItems: {
      fields: {
        status: {
          merge: false,
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const wsLink = new WebSocketLink({
  uri: WS_GRAPHQL_URL,
  options: {
    reconnect: true,
  },
});

const request = async (operation) => {
  const token = await AsyncStorage.getItem("token");

  operation.setContext({
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      // //console.log(observer)
      let handle;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const terminatingLink = split(({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === "OperationDefinition" && operation === "subscription";
}, wsLink);

const setupApollo = async () => {
  // await persistCache({
  //   cache,
  //   storage: AsyncStorage
  // })
  const client = new ApolloClient({
    link: concat(ApolloLink.from([terminatingLink, requestLink]), httpLink),
    cache,
    resolvers: {},
  });

  // set ref for global use
  // eslint-disable-next-line no-undef
  clientRef = client;

  return client;
};

export default setupApollo;
