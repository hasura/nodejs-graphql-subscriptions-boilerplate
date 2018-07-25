const Events = require('events');
const DeepEqual = require('deep-equal');
const uuidv1 = require('uuid/v1');
const { execute } = require('apollo-link');
const { WebSocketLink } = require('apollo-link-ws');
const { parse } = require('graphql');

module.exports = {
	subscribe: function(client, query, variables, dataKey) {
		var document = parse(query);
		var operationName = document.definitions[0].name.value;
		var subscriber = {
			client: client,
			query: query,
			variables: variables,
			operationName: operationName,
			dataKey: dataKey,
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
	}
}
