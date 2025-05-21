# 🔑 Environment Variables

Refer to the [`.env.example`](../src/.env.example) for the required environment variables.

The application expects the `AZURE_OPENAI_MODEL_DEPLOYMENTS` variable to contain the names of each Azure OpenAI deployment. Use a JSON string in the following format:

```json
{"gpt4o":"gpt4o-deployment","gpt35turbo":"gpt35-deployment","embedding":"embedding-deployment"}
```
