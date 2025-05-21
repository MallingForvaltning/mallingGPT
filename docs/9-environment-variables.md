# 🔑 Environment Variables

Refer to the [`.env.example`](../src/.env.example) for the required environment variables.


The application expects the `AZURE_OPENAI_MODEL_DEPLOYMENTS` variable to contain the names of each Azure OpenAI deployment. Use a JSON string in the following format:

```json
{"gpt-4o","o4-mini"}
```
=======
Key OpenAI settings include:

- `AZURE_OPENAI_API_INSTANCE_NAME` – your Azure OpenAI resource name.
- `AZURE_OPENAI_MODEL_DEPLOYMENTS` – JSON mapping of model names to deployment names.
- `AZURE_OPENAI_API_DEPLOYMENT_NAME` – deployment name of the default model.

