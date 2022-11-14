#Bike4Life

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
