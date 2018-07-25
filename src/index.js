// Setup a GraphQL subscription observable

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

const createSubscriptionObservable = (wsurl, query, variables) => {
  const link = new WebSocketLink(getWsClient(wsurl));
  // var operationName = graphQuery.definitions[0].name.value;
  return execute(link, { query: query, variables: variables });
};

// Usage

const gql = require('graphql-tag');

function main() {
  const subscribeQuery = gql`
subscription liveAuthor {
  author {
    id
    name
  }
}
`;
  
  const subscriptionClient = createSubscriptionObservable(
    'https://gatsby-ser.herokuapp.com/v1alpha1/graphql', // GraphQL URL
    subscribeQuery, // Subscription query 
    {} // Query variables
  );
  console.log('Starting the event');
  var consumer1 = subscriptionClient.subscribe(eventData => {
    console.log("Received event");
    console.log(JSON.stringify(eventData, null, 2));
    // Do something on receipt of the event
  }, (err) => {
    console.log('Err');
    console.log(err);
  });
}

main();
