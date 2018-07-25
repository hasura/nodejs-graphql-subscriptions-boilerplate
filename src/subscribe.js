const Events = require('events');
const DeepEqual = require('deep-equal');
const uuidv1 = require('uuid/v1');
const { execute } = require('apollo-link');
const { WebSocketLink } = require('apollo-link-ws');
const { parse } = require('graphql');
const { SubscriptionClient } = require('subscriptions-transport-ws');
const ws = require('ws');

const getWsClient = function(wsurl) {
  const client = new SubscriptionClient(
    wsurl, {reconnect: true}, ws
  );
  return client;
}

module.exports = {
	subscribe: function(wsurl, query, variables) {
		var graphQuery = parse(query);
		var operationName = graphQuery.definitions[0].name.value;
		var subscriber = {
			client: getWsClient(wsurl),
			query: query,
			variables: variables,
			operationName: operationName,
			executable: null,
			observable: null,
			cache: {},
			setObservable: function(observable){
				this.observable = observable;
			},
			start: function () {
				const link = new WebSocketLink(this.client);
				this.executable = execute(link, {query: this.query, operationName: this.operationName, variables: this.variables});
			},
			end: function () {
				this.observable.unsubscribe();
			}
		};
		return subscriber;
	},
  initClient: function(wsurl) {
  },
}
