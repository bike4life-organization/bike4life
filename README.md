# Bike4Life APIs

## Local dev instructions
In order to start developing within the local environment you must first execute this command:

```bash
docker-compose up -d
```

This will deploy locally:

- PubSub emulator
- MongoDB database instance
- Redis database instance

If you want to run the different apps, you may execute this:

```bash
npm run start project_name
```

For example, if you want to start the notifier, just run:

```bash
npm run start notifier
```

## PubSub and subscribers

Please, take into account that the subscriber need the PubSub emulator in order to work correctly in the local environment.
You can start the PubSub emulator with the `docker-compose up -d` command and in order to send PubSub messages to this emulator, you just have to use the HTTP POST endpoint that the emulator provides. These are the endpoints:

* Notifier:

```
http://localhost:8085/v1/projects/dev-pubsub-project/topics/notifier-topic:publish
```

* Route checker:

```
http://localhost:8085/v1/projects/dev-pubsub-project/topics/route-checker-topic:publish
```

The body should be like this one:

```json
{
	"messages": [
		{
				"data": "ewogICAgImFjY291bnRJZCI6ICJhY19uMnJuaXl4eCIsCiAgICAidXNlcklkIjogImF1dGgwfDYzNjIyOTUxZmYzZWFmNGZjZmQxYWFjZSIsCiAgICAidGVuYW50SWQiOiAiZ2NwLXVzLWVhc3QxIiwKICAgICJjYXJ0b0R3TG9jYXRpb24iOiAiVVMiLAogICAgImZvcmNlIjogZmFsc2UKfQ==",
			"attributes": {
				"type": "provisionCartoDW"
			}
		}
	]
}
```

Where the `data` field is a JSON object converted to a BASE64 string.
