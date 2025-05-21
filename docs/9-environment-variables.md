# 🔑 Environment Variables

Refer to the [`.env.example`](../src/.env.example) for the required environment variables.

The application expects the `AZURE_OPENAI_MODEL_DEPLOYMENTS` variable to map model names to the corresponding deployment names. Provide the mappings using a JSON string like the following:

```json
{
  "gpt-4o": "gpt-4o",
  "o4-mini": "o4-mini"
}
```

Use `AZURE_OPENAI_DEPLOYMENT_API_VERSIONS` to override the API version for deployments when required:

```json
{
  "o4-mini": "2024-12-01-preview"
}
```
