const Subscribe = require('./subscribe');
const fs = require('fs');
const ws = require('ws');
const { SubscriptionClient } = require('subscriptions-transport-ws');
const fetch = require('isomorphic-fetch');
const wsurl = process.env.GRAPHQL_URL;

const client = new SubscriptionClient(
	wsurl, {reconnect: true}, ws
);

const subscribeLiveQueries= `
subscription liveAuthor {
	author {
		id
	  name	
	}
}
`;

function watchNewSubscription() {
	var dataKey = "subscriptions";
	var variables = {};
	const subscriptionsSubscriber = Subscribe.subscribe(client, subscribeLiveQueries, variables, dataKey);
	subscriptionsSubscriber.start();
  console.log('Started watching for live query on author table');
	var obs = subscriptionsSubscriber.executable.subscribe(eventData => {
		console.log("Received event");
		console.log(JSON.stringify(eventData, null, 2));
    const options = {
      method: 'POST'
    };
    // Do something on receipt of the event
	});
	subscriptionsSubscriber.setObservable(obs);
}

watchNewSubscription();
