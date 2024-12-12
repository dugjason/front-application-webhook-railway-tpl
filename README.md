# Front Application Webhook Template
A [Front Application Webhook](https://dev.frontapp.com/docs/application-webhooks) processing application template optimized for deployment on [Railway.app](https://railway.app).

This template provides a robust foundation for handling events received from an Application Webhook with payload validation, integrity checking and built-in queue processing to allow you to process events asynchronously at scale.

## Features

- 🔒 Built-in webhook signature validation
- 📝 Schema-based payload validation
- 🔄 Queue-based webhook processing by [BullMQ](https://bullmq.io/)
- 🚦 Challenge-response handling
- 🚀 Ready to deploy on [Railway.app](https://railway.app)

## Quick Start

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.app/template/Ry0Mh9?referralCode=ANYK2b)

1. Click the "Deploy on Railway" button to deploy the template to [Railway](https://railway.app).

2. Once deployed, Railway will automatically set up your environment.

3. Ensure you set your `FRONT_APP_SECRET` environment variable in Railway.

### For local development:

Copy the `.env.example` file to `.env` and set your `FRONT_APP_SECRET` environment variable, and your Redis credentials. 

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# The server will start at http://localhost:3000
```

## Environment Variables

On deploying this template, Railway will automatically set the Redis environment variables for you.
You will need to set the `FRONT_APP_SECRET` environment variable in Railway.

## API Endpoints

- `POST /ingest`: Main Application Webhook endpoint

## Development

To modify this template for your use case, the first step is to update the queue processing logic in `src/queue/worker.ts`. This is where you'll add your logic for processing how you want to handle the received events.

## Contributing

Contributions are welcome and encouraged! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
