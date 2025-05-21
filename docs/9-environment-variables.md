# 🔑 Environment Variables

Refer to the [`.env.example`](../src/.env.example) for the required environment variables.

The application expects the `AZURE_OPENAI_MODEL_DEPLOYMENTS` variable to map model names to the corresponding deployment names. Provide the mappings using a JSON string like the following:

```json
{
  "gpt-4o": "gpt-4o",
  "o4-mini": "o4-mini"
}
