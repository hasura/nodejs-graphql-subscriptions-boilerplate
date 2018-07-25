# Boilerplate to test GraphQL subscriptions using nodejs
Setting up your NodeJS code to use GraphQL subscriptions involves going through a few hoops.
Using GraphQL subscriptions from your NodeJS code is especially useful if you want to react to events or changes on a GraphQL backend.

## Usage:

- Reference code:
  Refer to [index.js](./index.js) for the boilerplate code that sets up a GraphQL subscription observable.

- Dependencies:
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
