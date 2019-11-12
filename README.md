# Boilerplate to test GraphQL subscriptions using nodejs
Although it takes just a [few lines of code](./index.js#L1-L21) to set up your NodeJS code to use GraphQL subscriptions, it does involve going through a few pages of docs. Here's a few lines of boilerplate you can use to get started quickly (copy-paste 🤘).

## Usage:

- Reference code:
  Refer to [index.js](./index.js#L1-L21) for the boilerplate code that sets up a GraphQL subscription observable.


#### Step 1: Setup the subscription client

  This is all the code you need
```javascript

const { execute } = require('apollo-link');
const { WebSocketLink } = require('apollo-link-ws');
const { SubscriptionClient } = require('subscriptions-transport-ws');
const ws = require('ws');

const getWsClient = function(wsurl) {
  const client = new SubscriptionClient(
    wsurl, {reconnect: true}, ws
  );
  
  // Or with X-Hasura-Access-Key...
  // const client = new SubscriptionClient(
  //  wsurl,
  //   {
  //     connectionParams: () => ({
  //       headers: { "X-Hasura-Access-Key": HASURA_ACCESS_KEY },
  //     }),
  //     reconnect: true,
  //   },
  //   ws,
  // );
  
  return client;
};

const createSubscriptionObservable = (wsurl, query, variables) => {
  const link = new WebSocketLink(getWsClient(wsurl));
  return execute(link, {query: query, variables: variables});
};
```

#### Step 2: Use it

```javascript
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
```

#### Dependencies:

  This uses the [apollo link](https://github.com/apollographql/apollo-link), [subscription-transport-ws](https://github.com/apollographql/subscriptions-transport-ws) libraries.
  
```
npm install --save graphql graphql-tag apollo-link apollo-link-ws subscriptions-transport-ws ws
```

--------------------

## Try it out:

- Use [hasura](https://hasura.io) as a test backend: [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)
- Create a table `author` with columns `id: integer`, `name: text`
- Set the GraphQL endpoint in `index.js` to `https://HEROKU_APP_NAME.herokuoapp.com/v1alpha1/graphql`
- `git clone https://github.com/hasura/nodejs-graphql-subscriptions-boilerplate.git`
- `cd nodejs-graphql-subscriptions-boilerplate`
- `npm i`
- `node index.js`
- Now head to the Hasura console and insert an author with id: 1, name: honeysingh
- Changes will appear on your nodejs code
- Edit the row on the console
- Changes will appear on your nodejs code
