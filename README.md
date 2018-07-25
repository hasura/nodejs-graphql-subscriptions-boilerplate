# Boilerplate to test GraphQL subscriptions using nodejs

## Test

1. Clone the repository `git clone git@github.com:karthikvt26/nodejs-graphql-subscriptions-boilerplate.git`

2. `cd nodejs-graphql-subscriptions-boilerplate`

3. Run `npm install`

4. Run `GRAPHQL_URL=https://gatsby-ser.herokuapp.com/v1alpha1/graphql node src/index.js`

Insert/Update any row in Hasura [console](https://gatsby-ser.herokuapp.com/console/data/schema/public/tables/author/browse), check the logs of the node server. You should see the updated value.
