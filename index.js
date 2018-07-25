/*****  Setup a GraphQL subscription observable  ******************************/

const { execute } = require('apollo-link');
const { WebSocketLink } = require('apollo-link-ws');
const { SubscriptionClient } = require('subscriptions-transport-ws');
const ws = require('ws');

const getWsClient = function(wsurl) {
  const client = new SubscriptionClient(
    wsurl, {reconnect: true}, ws
  );
  return client;
};

// wsurl: GraphQL endpoint
// query: GraphQL query (use gql`` from the 'graphql-tag' library)
// variables: Query variables object
const createSubscriptionObservable = (wsurl, query, variables) => {
  const link = new WebSocketLink(getWsClient(wsurl));
  return execute(link, {query: query, variables: variables});
};

/*****************************************************************************/




/*********** Sample usage from your nodejs code ******************************/

const gql = require('graphql-tag');
// A subscription query to get changes for author with parametrised id 
// using $id as a query variable
const SUBSCRIBE_QUERY = gql`
subscription liveAuthor($id: Int!) {
  author (where: {id: {_eq: $id}}) {
    id
    name
  }
}
`;

function main() {
  const subscriptionClient = createSubscriptionObservable(
    'https://test-gql-sub.herokuapp.com/v1alpha1/graphql', // GraphQL endpoint
    SUBSCRIBE_QUERY,                                       // Subscription query
    {id: 1}                                                // Query variables
  );
  var consumer = subscriptionClient.subscribe(eventData => {
    // Do something on receipt of the event
    console.log("Received event: ");
    console.log(JSON.stringify(eventData, null, 2));
  }, (err) => {
    console.log('Err');
    console.log(err);
  });
}

main();
