# Boilerplate to test GraphQL subscriptions using nodejs
Although it takes just a [few lines of code](https://github.com/apollographql/subscriptions-transport-ws) to set up your NodeJS code to use GraphQL subscriptions, it does involve going through a few pages of docs. We've put together a few lines of boilerplate code to make it easy to get started.

## Usage:

- Reference code:
  Refer to [index.js](./index.js#L1-L21) for the boilerplate code that sets up a GraphQL subscription observable.

- Dependencies:
  This uses the [apollo link](https://github.com/apollographql/apollo-link), [subscription-transport-ws](https://github.com/apollographql/subscriptions-transport-ws) libraries.
  `npm install --save graphql graphql-tag apollo-link apollo-link-ws subscriptions-transport-ws ws`

## Try it out:

- Use hasura as a test backend: [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)
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
