const Subscribe = require('./subscribe');
const wsurl = process.env.GRAPHQL_URL;

const subscribeQuery = `
subscription liveAuthor {
	author {
		id
	  name	
	}
}
`;

function main() {
  // Get a fresh subscription instance with the given configuration
  // wsurl: GraphQL url
  // query: Initial GraphQL query
  // variables: Variables if any
	const subscriptionInstance = Subscribe.subscribe(
		wsurl, // GraphQL URL
		subscribeLiveQueries, // Subscription query 
		{} // Query variables
	);
  
  // open the websocket connection with the upstream (GraphQL server)
  subscriptionInstance.start();
  console.log('Started watching for live query on author table');

  // and returns an observer which can be used to end the connection later.
  // Callback will be called whenever there is new data available from the upstream
	var observer = subscriptionInstance.executable.subscribe(eventData => {
		console.log("Received event");
		console.log(JSON.stringify(eventData, null, 2));
    // Do something on receipt of the event
	});
	subscriptionInstance.setObservable(observer);
}

main();
